// src/matchmaking.js
const { v4: uuidv4 } = require("uuid");
// REMOVA ESTA LINHA POR COMPLETO! activeGames NÃO É MAIS IMPORTADO DIRETAMENTE AQUI.
// const { activeGames } = require("./gameLogic");

// --- ESTRUTURAS DE DADOS GLOBAIS ---
const pendingGamesByCategory = new Map();
const disconnectTimers = new Map();
const onlineUsers = new Map(); // Mapeia: userId -> { socketId, username }
const pendingChallenges = new Map();

// --- LÓGICA PRINCIPAL DE MATCHMAKING ---
// A função matchmaking recebe gameLogicFunctions, admin, prisma
const matchmaking = (io, gameLogicFunctions, admin, prisma) => {
  const handleConnection = (socket) => {
    console.log(`Backend: Socket ${socket.id} conectado.`);
    gameLogicFunctions.setupSocketEvents(socket); // Anexa listeners de jogo (responder, desistir)

    // =================================================================
    // FUNÇÕES AUXILIARES (definidas aqui dentro para aceder a 'io' e 'socket')
    // =================================================================

    const getUserIdBySocketId = (socketId) => {
      for (const [userId, userData] of onlineUsers.entries()) {
        if (userData.socketId === socketId) return userId;
      }
      return null;
    };

    // Função para obter o FCM Token do Banco de Dados
    const getFcmTokenByUserId = async (userId) => {
      try {
        if (!prisma) {
          console.warn(
            "Prisma client não fornecido ao matchmaking. Não é possível buscar FCM Token."
          );
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { pushToken: true },
        });
        return user ? user.pushToken : null;
      } catch (error) {
        console.error(
          `Erro ao buscar FCM Token para o usuário ${userId}:`,
          error
        );
        return null;
      }
    };

    const emitGameStarted = (game) => {
      if (!game || !game.player1 || !game.player2) return;
      const payload = {
        gameId: game.id,
        config: game.config,
        player1: { id: game.player1.id, username: game.player1.username },
        player2: { id: game.player2.id, username: game.player2.username },
      };
      io.to(game.player1.socketId).emit("gameStarted", {
        ...payload,
        opponent: payload.player2,
      });
      io.to(game.player2.socketId).emit("gameStarted", {
        ...payload,
        opponent: payload.player1,
      });
      console.log(`[emitGameStarted DEBUG] Evento 'gameStarted' emitido para GameId: ${game.id}`);
    };

    const cancelGracePeriod = (gameId) => {
      if (disconnectTimers.has(gameId)) {
        clearTimeout(disconnectTimers.get(gameId));
        disconnectTimers.delete(gameId);
        console.log(`Backend: Grace period para o jogo ${gameId} cancelado.`);
      }
    };

    // =================================================================
    // LISTENERS DE SOCKET (O que o servidor "ouve" do cliente)
    // =================================================================

    socket.on("user:online", ({ userId, username, fcmToken }) => {
      onlineUsers.set(userId, { socketId: socket.id, username, fcmToken });
      console.log(
        `Backend: Usuário ${username} (${userId}) está online. Total: ${onlineUsers.size}`
      );
      console.log(`Backend: onlineUsers Map keys: ${Array.from(onlineUsers.keys())}`);
    });

    // --- Matchmaking Público ---
    const handlePublicMatchmaking = (playerData, gameConfig) => {
      const { category } = gameConfig;
      const categoryQueue = pendingGamesByCategory.get(category);

      console.log(`[PUBLIC_MATCH_DEBUG] handlePublicMatchmaking chamado para user: ${playerData.username}, category: ${category}`);

      if (categoryQueue && categoryQueue.size > 0) {
        const gameIdToJoin = categoryQueue.keys().next().value;
        const gameToJoin = categoryQueue.get(gameIdToJoin);
        categoryQueue.delete(gameIdToJoin);

        gameToJoin.player2 = {
          id: playerData.userId,
          username: playerData.username,
          score: 0,
          socketId: socket.id,
          isReady: false,
          hasAnswered: false,
        };
        // >>> ALTERAÇÃO AQUI: Use gameLogicFunctions.addGame <<<
        gameLogicFunctions.addGame(gameToJoin.id, gameToJoin);
        console.log(`[PUBLIC_MATCH_DEBUG] Jogo ${gameToJoin.id} ATUALIZADO (player2 adicionado) via gameLogicFunctions.addGame.`);
        console.log(`[PUBLIC_MATCH_DEBUG] Conteúdo ATUAL de activeGames.keys() APÓS player2:`, Array.from(gameLogicFunctions.getActiveGames().keys()));
        socket.join(gameToJoin.id);
        emitGameStarted(gameToJoin);
      } else {
        const newGame = {
          id: uuidv4(),
          player1: {
            id: playerData.userId,
            username: playerData.username, // Corrigido para username
            socketId: socket.id,
            score: 0,
            isReady: false,
            hasAnswered: false,
          },
          player2: null,
          questions: [],
          currentQuestionIndex: 0,
          isFinished: false,
          config: gameConfig,
        };
        // >>> ALTERAÇÃO AQUI: Use gameLogicFunctions.addGame <<<
        gameLogicFunctions.addGame(newGame.id, newGame);
        console.log(`[PUBLIC_MATCH_DEBUG] NOVA partida ${newGame.id} CRIADA e ADICIONADA via gameLogicFunctions.addGame.`);
        console.log(`[PUBLIC_MATCH_DEBUG] Conteúdo ATUAL de activeGames.keys() APÓS criar:`, Array.from(gameLogicFunctions.getActiveGames().keys()));
        if (!pendingGamesByCategory.has(category))
          pendingGamesByCategory.set(category, new Map());
        pendingGamesByCategory.get(category).set(newGame.id, newGame);
        socket.join(newGame.id);
        socket.emit("gameCreated", {
          gameId: newGame.id,
          message: "Partida criada! Aguardando oponente...",
        });
      }
    };

    socket.on(
      "createGame",
      ({ userId, username, category, numQuestions, quizTime }) => {
        handlePublicMatchmaking(
          { userId, username },
          { category, numQuestions, quizTime }
        );
      }
    );

    socket.on(
      "joinGame",
      ({ userId, username, category, numQuestions, quizTime }) => {
        handlePublicMatchmaking(
          { userId, username },
          { category, numQuestions, quizTime }
        );
      }
    );

    // --- Desafios Privados ---
    socket.on(
      "challenge:create",
      async ({ opponentId, category, numQuestions, quizTime }) => {
        console.log(
          `[CHALLENGE_CREATE_DEBUG] Evento 'challenge:create' recebido. Oponente ID: ${opponentId}, Categoria: ${category}`
        );
        console.log(`[CHALLENGE_CREATE_DEBUG] Socket ID do desafiador: ${socket.id}`);

        const challengerId = getUserIdBySocketId(socket.id);
        if (!challengerId) {
          console.warn(
            "Challenger ID não encontrado para o socket (usuário offline ou problema no user:online):",
            socket.id
          );
          return;
        }

        const challengerData = onlineUsers.get(challengerId);
        const opponentData = onlineUsers.get(opponentId);

        console.log(`[CHALLENGE_CREATE_DEBUG] Dados do Desafiador (challengerData):`, challengerData);
        console.log(`[CHALLENGE_CREATE_DEBUG] Dados do Oponente (opponentData):`, opponentData);
        console.log(
          `[CHALLENGE_CREATE_DEBUG] Verificando condições: opponentData=${!!opponentData}, opponentSocketId !== socket.id=${
            opponentData && opponentData.socketId !== socket.id
          }, challengerData=${!!challengerData}`
        );

        if (opponentData && opponentData.socketId !== socket.id && challengerData) {
          console.log(`[CHALLENGE_CREATE_DEBUG] Condições de desafio (oponente online e diferente) atendidas.`);

          const gameId = uuidv4();
          console.log(
            `Backend: ${challengerData.username} desafiou ${opponentData.username}. Game ID: ${gameId}`
          );

          const challengeTimeout = setTimeout(() => {
            if (pendingChallenges.has(gameId)) {
              io.to(socket.id).emit("desafio:expirado");
              pendingChallenges.delete(gameId);
              console.log(`[CHALLENGE_CREATE_DEBUG] Desafio ${gameId} expirou e foi limpo.`);
            }
          }, 30000);

          pendingChallenges.set(gameId, {
            challengerId,
            opponentId,
            category,
            numQuestions: numQuestions || 5,
            quizTime: quizTime || 60,
            timeout: challengeTimeout,
          });
          console.log(`[CHALLENGE_CREATE_DEBUG] Desafio ${gameId} adicionado a pendingChallenges. Tamanho: ${pendingChallenges.size}`);

          // --- Enviar Notificação Push ao Oponente ---
          try {
            let opponentFcmToken = opponentData.fcmToken;

            if (!opponentFcmToken && prisma) {
                opponentFcmToken = await getFcmTokenByUserId(opponentId);
            }

            console.log(`[FCM Debug] FCM Token final para oponente ${opponentId}:`, opponentFcmToken ? "Obtido" : "NÃO OBTIDO");
            console.log(`[FCM Debug] Admin SDK disponível?`, !!admin);

            if (opponentFcmToken && admin) {
              console.log(`[FCM Debug] CONDIÇÕES PARA ENVIO FCM ATENDIDAS!`);
              const message = {
                notification: {
                  title: "Novo Desafio!",
                  body: `${challengerData.username} te desafiou para um quiz de ${category}!`,
                },
                data: {
                  screen: "ChallengeWaiting",
                  challengerId: challengerId,
                  challengerName: challengerData.username,
                  gameId: gameId,
                  category: category,
                  type: "challenge_request",
                },
                token: opponentFcmToken,
              };

              const response = await admin.messaging().send(message);
              console.log("[FCM] Notificação FCM de desafio enviada com sucesso:", response);
            } else {
              console.warn(
                `[FCM] Notificação NÃO enviada: FCM Token (${opponentFcmToken}) ausente ou Firebase Admin SDK não disponível.`
              );
            }
          } catch (fcmError) {
            console.error("[FCM] Erro EXCEPCIONAL ao enviar notificação FCM:", fcmError);
          }

          io.to(opponentData.socketId).emit("challenge:received", {
            challengerName: challengerData.username,
            gameId,
          });
          socket.emit("desafio:enviado");
          console.log(`[CHALLENGE_CREATE_DEBUG] Evento 'challenge:received' emitido para oponente e 'desafio:enviado' para desafiador.`);
        } else {
          console.warn(
            `[CHALLENGE_CREATE_DEBUG] Desafio não processado. Motivo: Oponente offline ou inválido, ou desafiador inválido. OponenteOnline=${!!opponentData}, ChallengerOnline=${!!challengerData}`
          );
          socket.emit("desafio:erro", {
            message: "Não é possível desafiar este jogador (offline ou dados inválidos).",
          });
        }
      }
    );

    socket.on("challenge:accept", ({ gameId }) => {
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Evento 'challenge:accept' recebido para GameId: ${gameId}`);
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Socket ID do aceitador: ${socket.id}`);

      const challenge = pendingChallenges.get(gameId);
      const opponentId = getUserIdBySocketId(socket.id);

      if (!challenge || opponentId !== challenge.opponentId) {
        console.warn(`[CHALLENGE_ACCEPT_DEBUG] CONDIÇÃO FALHA (Aceite): Desafio ${gameId} inválido ou oponente (${opponentId}) não corresponde ao desafiado (${challenge?.opponentId}).`);
        console.log(`[CHALLENGE_ACCEPT_DEBUG] Challenge existe: ${!!challenge}, Oponente ID do socket: ${opponentId}, Oponente ID no desafio: ${challenge?.opponentId}`);
        return;
      }
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Desafio ${gameId} válido. Oponente ${opponentId} aceitando.`);

      clearTimeout(challenge.timeout);
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Timeout do desafio ${gameId} cancelado.`);

      const challengerData = onlineUsers.get(challenge.challengerId);
      const opponentData = onlineUsers.get(challenge.opponentId);

      if (!challengerData || !opponentData) {
        console.error(`[CHALLENGE_ACCEPT_DEBUG] CONDIÇÃO FALHA (Aceite): Desafiador ou oponente offline em onlineUsers. Desafiador online: ${!!challengerData}, Oponente online: ${!!opponentData}.`);
        return pendingChallenges.delete(gameId);
      }
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Desafiador (${challengerData.username}) e Oponente (${opponentData.username}) encontrados em onlineUsers.`);

      const newGame = {
        id: gameId,
        player1: {
          id: challenge.challengerId,
          username: challengerData.username,
          score: 0,
          socketId: challengerData.socketId,
          isReady: false,
          hasAnswered: false,
        },
        player2: {
          id: challenge.opponentId,
          username: opponentData.username,
          score: 0,
          socketId: opponentData.socketId,
          isReady: false,
          hasAnswered: false,
        },
        config: {
          category: challenge.category,
          numQuestions: challenge.numQuestions,
          quizTime: challenge.quizTime,
        },
        questions: [],
        isFinished: false,
        currentQuestionIndex: 0,
      };

      // >>> MUDANÇA AQUI: Use gameLogicFunctions.addGame <<<
      gameLogicFunctions.addGame(gameId, newGame);

      console.log(`[CHALLENGE_ACCEPT_DEBUG] Jogo ${gameId} CRIADO via gameLogicFunctions.addGame.`);
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Conteúdo ATUAL de activeGames.keys() APÓS adição:`, Array.from(gameLogicFunctions.getActiveGames().keys()));
      console.log(`[CHALLENGE_ACCEPT_DEBUG] activeGames.get(${gameId}) existe?`, gameLogicFunctions.getGame(gameId) ? "SIM" : "NÃO");

      const challengerSocket = io.sockets.sockets.get(challengerData.socketId);
      if (challengerSocket) {
        challengerSocket.join(gameId);
        console.log(`[CHALLENGE_ACCEPT_DEBUG] Desafiador socket ${challengerData.socketId} entrou na sala ${gameId}.`);
      } else {
        console.warn(`[CHALLENGE_ACCEPT_DEBUG] ERRO: Socket do desafiador ${challengerData.socketId} não encontrado para entrar na sala.`);
      }

      socket.join(gameId);
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Oponente socket ${socket.id} entrou na sala ${gameId}.`);

      console.log(`[CHALLENGE_ACCEPT_DEBUG] Chamando emitGameStarted para o jogo ${gameId}.`);
      emitGameStarted(newGame);

      pendingChallenges.delete(gameId);
      console.log(`[CHALLENGE_ACCEPT_DEBUG] Desafio ${gameId} removido de pendingChallenges.`);
    });

    socket.on("challenge:decline", ({ gameId }) => {
      console.log(`[CHALLENGE_DECLINE_DEBUG] Evento 'challenge:decline' recebido para GameId: ${gameId}`);
      const challenge = pendingChallenges.get(gameId);
      if (!challenge) {
        console.warn(`[CHALLENGE_DECLINE_DEBUG] Desafio ${gameId} não encontrado.`);
        return;
      }
      const challengerSocketData = onlineUsers.get(challenge.challengerId);
      if (challengerSocketData && challengerSocketData.socketId)
        io.to(challengerSocketData.socketId).emit("desafio:recusado", {
          message: "Seu convite foi recusado.",
        });
      else {
        console.warn(`[CHALLENGE_DECLINE_DEBUG] Socket do desafiador ${challenge.challengerId} não encontrado para notificar sobre recusa.`);
      }
      clearTimeout(challenge.timeout);
      pendingChallenges.delete(gameId);
      console.log(`[CHALLENGE_DECLINE_DEBUG] Desafio ${gameId} recusado e limpo.`);
    });

    // --- Gestão do Jogo ---

    socket.on("playerReadyForGame", ({ gameId, userId }) => {
      console.log(`[PLAYER_READY_FINAL_DEBUG] Evento 'playerReadyForGame' RECEBIDO!`);
      console.log(`[PLAYER_READY_FINAL_DEBUG] GameId recebido: ${gameId}`);
      console.log(`[PLAYER_READY_FINAL_DEBUG] UserId recebido: ${userId}`);
      console.log(`[PLAYER_READY_FINAL_DEBUG] Socket ID do jogador: ${socket.id}`);

      // >>> MUDANÇA AQUI: Use gameLogicFunctions.getGame() para obter o jogo <<<
      const game = gameLogicFunctions.getGame(gameId);

      if (!game) {
        console.error(`[PLAYER_READY_FINAL_DEBUG] ERRO GRAVE: Jogo ${gameId} NÃO encontrado em activeGames no playerReadyForGame! (Usando gameLogicFunctions.getGame())`);
        console.log(`[PLAYER_READY_FINAL_DEBUG] activeGames.keys() atuais via gameLogicFunctions.getActiveGames():`, Array.from(gameLogicFunctions.getActiveGames().keys()));
        return;
      }
      console.log(`[PLAYER_READY_FINAL_DEBUG] Jogo ${gameId} ENCONTRADO em activeGames.`);

      cancelGracePeriod(gameId);

      const player = game.player1.id === userId ? game.player1 : game.player2;

      if (player) {
        console.log(`[PLAYER_READY_FINAL_DEBUG] Jogador identificado: ${player.username} (ID: ${player.id})`);
        socket.join(gameId);
        player.socketId = socket.id;
        player.isReady = true;
        console.log(`[PLAYER_READY_FINAL_DEBUG] Jogador ${player.username} marcado como PRONTO.`);
        console.log(`[PLAYER_READY_FINAL_DEBUG] Estado de isReady - Player1: ${game.player1.isReady}, Player2: ${game.player2?.isReady}`);
      } else {
        console.error(`[PLAYER_READY_FINAL_DEBUG] ERRO: Jogador ${userId} não encontrado no objeto do jogo ${gameId}.`);
        return;
      }

      if (game.player1.isReady && game.player2?.isReady) {
        console.log(
          `Backend: Ambos prontos para ${gameId}. Configs: ${JSON.stringify(
            game.config
          )}`
        );
        gameLogicFunctions.startGame(gameId);
      } else {
        console.log(`Backend: Aguardando o outro jogador ficar pronto para ${gameId}.`);
      }
    });

    // --- Disconexão ---
    socket.on("disconnect", () => {
      console.log(`Backend: Socket ${socket.id} desconectado.`);
      const userId = getUserIdBySocketId(socket.id);
      if (userId) {
        onlineUsers.delete(userId);
        console.log(`Backend: Usuário ${userId} removido de onlineUsers. Total: ${onlineUsers.size}`);
      }

      // Lógica de desconexão para jogos ativos ou pendentes
      gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
        if (game.player1.socketId === socket.id || game.player2?.socketId === socket.id) {
          const timeout = setTimeout(() => {
            if (gameLogicFunctions.getGame(gameId)) {
              console.log(`Backend: Jogador não reconectou para ${gameId}. Encerrando partida.`);
              gameLogicFunctions.endGame(gameId, "disconnect");
            }
            disconnectTimers.delete(gameId);
          }, 15000);
          disconnectTimers.set(gameId, timeout);
          console.log(`Backend: Grace period iniciado para jogo ${gameId} devido à desconexão de ${userId}.`);

          const otherPlayer = game.player1.socketId === socket.id ? game.player2 : game.player1;
          if (otherPlayer && otherPlayer.socketId) {
            io.to(otherPlayer.socketId).emit("player:disconnected", { message: "Seu oponente se desconectou temporariamente..." });
          }
        }
      });

      pendingChallenges.forEach((challenge, gameId) => {
        if (challenge.challengerId === userId || challenge.opponentId === userId) {
          clearTimeout(challenge.timeout);
          pendingChallenges.delete(gameId);
          console.log(`Backend: Desafio ${gameId} removido devido à desconexão de um dos participantes.`);
          const otherId = challenge.challengerId === userId ? challenge.opponentId : challenge.challengerId;
          const otherSocketData = onlineUsers.get(otherId);
          if (otherSocketData && otherSocketData.socketId) {
            io.to(otherSocketData.socketId).emit("desafio:cancelado", { message: "O desafio foi cancelado porque o outro jogador se desconectou." });
          }
        }
      });
    });
  };

  return handleConnection;
};

module.exports = matchmaking;