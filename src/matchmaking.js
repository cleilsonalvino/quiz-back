const { v4: uuidv4 } = require("uuid");
const { criarBotHandler } = require("./botGame");

// --- ESTRUTURAS DE DADOS GLOBAIS ---
const pendingGamesByCategory = new Map();
const disconnectTimers = new Map();
const onlineUsers = new Map();
const pendingChallenges = new Map(); // Mapeia: gameId -> { challengerId, opponentId, category, numQuestions, quizTime, timeout }

// Cache para a última lista de jogos pendentes emitida
let lastEmittedPendingListJson = "[]";

// --- LÓGICA PRINCIPAL DE MATCHMAKING ---
const matchmaking = (io, gameLogicFunctions, prisma) => {
  const adicionarBotNaPartida = criarBotHandler(gameLogicFunctions, io);

  const emitPendingGamesList = () => {
    const pendingList = [];
    pendingGamesByCategory.forEach((categoryMap, categoryName) => {
      categoryMap.forEach((game) => {
        if (game.player1 && !game.player2) {
          pendingList.push({
            gameId: game.id,
            category: categoryName,
            player1Username: game.player1.username,
            config: game.config,
            numQuestions: game.config.numQuestions,
            quizTime: game.config.quizTime,
          });
        }
      });
    });

    const currentPendingListJson = JSON.stringify(pendingList);

    if (currentPendingListJson !== lastEmittedPendingListJson) {
      io.emit("matchmaking:pending_list", pendingList);
      lastEmittedPendingListJson = currentPendingListJson;
      console.log(
        `[BACKEND] Lista de partidas pendentes emitida: ${pendingList.length} partidas (mudou).`
      );
    } else {
      // console.log(`[BACKEND] Lista de partidas pendentes não mudou. Não emitindo.`);
    }
  };

  const handleConnection = (socket) => {
    console.log(`Backend: Socket ${socket.id} conectado.`);
    gameLogicFunctions.setupSocketEvents(socket);

    // =================================================================
    // FUNÇÕES AUXILIARES
    // =================================================================

    const getUserIdBySocketId = (socketId) => {
      for (const [userId, userData] of onlineUsers.entries()) {
        if (userData.socketId === socketId) return userId;
      }
      return null;
    };

    const emitGameStarted = (game) => {
      if (!game || !game.player1 || !game.player2) return;
      const payload = {
        gameId: game.id,
        config: game.config,
        player1: { id: game.player1.id, username: game.player1.username },
        player2: { id: game.player2.id, username: game.player2.username },
      };
      io.to(game.player1.socketId).emit("gameStarted", payload);
      io.to(game.player2.socketId).emit("gameStarted", payload);
      console.log(
        `[emitGameStarted DEBUG] Evento 'gameStarted' emitido para GameId: ${game.id}`
      );

      if (pendingChallenges.has(game.id)) {
        clearTimeout(pendingChallenges.get(game.id).timeout);
        pendingChallenges.delete(game.id);
        console.log(
          `[emitGameStarted DEBUG] Desafio ${game.id} limpo após início do jogo.`
        );
      }

      if (pendingGamesByCategory.has(game.config.category)) {
        pendingGamesByCategory.get(game.config.category).delete(game.id);
        console.log(
          `[emitGameStarted DEBUG] Jogo ${game.id} removido da fila de categoria ${game.config.category}.`
        );
      }
      emitPendingGamesList();
    };

    const cancelGracePeriod = (gameId) => {
      if (disconnectTimers.has(gameId)) {
        clearTimeout(disconnectTimers.get(gameId));
        disconnectTimers.delete(gameId);
        console.log(`Backend: Grace period para o jogo ${gameId} cancelado.`);
      }
    };

    /**
     * Verifica se um usuário já está em um jogo ativo, fila de espera ou desafio pendente.
     * @param {string} userId - O ID do usuário a ser verificado.
     * @param {string} [excludeGameId=null] - Opcional: Um ID de jogo/desafio para excluir da verificação de "ocupado".
     * Isso permite que um jogador aceite/cancele o PRÓPRIO desafio sem ser considerado ocupado.
     * @returns {boolean} True se o usuário estiver ocupado, false caso contrário.
     */
    const isUserBusy = (userId, excludeGameId = null) => {
      // 1. Verificar em jogos ativos
      for (const [gameId, game] of gameLogicFunctions
        .getActiveGames()
        .entries()) {
        if (
          !game.isFinished &&
          (game.player1?.id === userId || game.player2?.id === userId)
        ) {
          console.log(
            `[isUserBusy] Usuário ${userId} está em jogo ativo ${gameId}.`
          );
          return true;
        }
      }

      // 2. Verificar em jogos pendentes (fila de matchmaking público)
      for (const categoryMap of pendingGamesByCategory.values()) {
        for (const [gameId, game] of categoryMap.entries()) {
          if (game.player1?.id === userId && game.player2 === null) {
            console.log(
              `[isUserBusy] Usuário ${userId} está na fila de matchmaking público ${gameId}.`
            );
            return true;
          }
        }
      }

      // 3. Verificar em desafios pendentes (enviados ou recebidos)
      for (const [gameId, challenge] of pendingChallenges.entries()) {
        // Se o desafio for o que estamos tentando excluir (ou seja, o desafio que o usuário está aceitando/cancelando), ignore-o.
        if (excludeGameId && gameId === excludeGameId) {
          continue; // Pula a verificação para este desafio específico
        }
        if (
          challenge.challengerId === userId ||
          challenge.opponentId === userId
        ) {
          console.log(
            `[isUserBusy] Usuário ${userId} está em DESAFIO PENDENTE (diferente de ${excludeGameId}) ${gameId}.`
          );
          return true;
        }
      }
      console.log(
        `[isUserBusy] Usuário ${userId} está LIVRE (Verificado, excluindo desafio ${excludeGameId}).`
      );
      return false;
    };

    // =================================================================
    // LISTENERS DE SOCKET
    // =================================================================

    socket.on("matchmaking:leave_queue_or_room", ({ userId }) => {
      console.log(
        `[matchmaking:leave_queue_or_room] Usuário ${userId} solicitou saída da fila/sala.`
      );

      // 1. Procurar e remover de pendingGamesByCategory (filas públicas)
      let removedFromPendingQueue = false;
      pendingGamesByCategory.forEach((categoryMap, categoryName) => {
        const gamesToRemove = [];
        categoryMap.forEach((game, gameId) => {
          // Se o usuário é o player1 da fila (o criador da vaga)
          if (game.player1?.id === userId && !game.player2) {
            gamesToRemove.push(gameId);
            console.log(
              `[matchmaking:leave_queue_or_room] Removendo partida pública ${gameId} da fila de ${categoryName} (criada por ${userId}).`
            );
            gameLogicFunctions.removeGame(gameId); // Garante que o jogo é limpo do activeGames se for uma fila
            removedFromPendingQueue = true;
          }
          // Se o usuário é o player2 tentando entrar numa partida pendente
          // (Isso é mais comum quando o player2 aceita um desafio e navega,
          // mas o gameId pode ainda estar na lista pendente do player1.
          // Ou se ele tentou entrar e saiu antes de encontrar oponente).
          if (game.player2?.id === userId) {
            // Se for um cenário onde player2 entrou e saiu antes do gameStarted
            // ou se o socket do player2 se desconectou do jogo logo após entrar
            console.log(
              `[matchmaking:leave_queue_or_room] Player2 ${userId} saiu de uma partida pendente ${gameId}.`
            );
            // Você pode adicionar uma lógica mais complexa aqui
            // para lidar com este caso, como notificar player1
            // ou forçar a remoção da partida. Por enquanto, a
            // remoção do player1 já é o foco principal.
          }
        });
        gamesToRemove.forEach((gameId) => categoryMap.delete(gameId));
      });
      if (removedFromPendingQueue) {
        emitPendingGamesList(); // Atualiza a lista para todos os clientes
      }

      // 2. Procurar e remover de pendingChallenges (desafios pendentes)
      let removedChallengeId = null;
      pendingChallenges.forEach((challenge, gameId) => {
        if (
          challenge.challengerId === userId ||
          challenge.opponentId === userId
        ) {
          console.log(
            `[matchmaking:leave_queue_or_room] Removendo desafio pendente ${gameId} (envolvendo ${userId}).`
          );
          clearTimeout(challenge.timeout);
          pendingChallenges.delete(gameId);
          removedChallengeId = gameId; // Guarda o ID do desafio removido
          // Notificar o outro jogador do desafio que ele foi cancelado/abandonado
          const otherPlayerId =
            challenge.challengerId === userId
              ? challenge.opponentId
              : challenge.challengerId;
          const otherPlayerSocketData = onlineUsers.get(otherPlayerId);
          if (otherPlayerSocketData && otherPlayerSocketData.socketId) {
            io.to(otherPlayerSocketData.socketId).emit("challenge:canceled", {
              gameId: gameId,
              message: "O oponente saiu da tela de espera.",
            });
          }
        }
      });

      // 3. Encerrar partidas ativas ou salas se o usuário for o último ou a sala tiver que ser limpa
      // Isso geralmente acontece via `endGame` nas `gameLogicFunctions`
      // Mas se a partida estiver em um estado "intermediário" (tipo, sala personalizada com 1 jogador)
      // e esse 1 jogador sair, a sala deve ser limpa.
      let removedRoom = false;
      gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
        // Se o jogo é uma sala personalizada (e não uma partida rápida já iniciada)
        // e o único jogador presente (se for o caso) for o que saiu, a sala é limpa.
        // A sua estrutura de `gameLogicFunctions.removeGame(gameId)` já cuida da limpeza.
        if (
          game.isCustomRoom &&
          (game.player1?.id === userId || game.player2?.id === userId)
        ) {
          // Se a sala tem apenas um jogador e ele saiu
          if (game.player1 && !game.player2 && game.player1.id === userId) {
            console.log(
              `[matchmaking:leave_queue_or_room] Sala personalizada vazia ${gameId} removida.`
            );
            gameLogicFunctions.removeGame(gameId); // Remove a sala se o criador saiu
            removedRoom = true;
          }
          // Você pode adicionar mais lógica aqui para lidar com salas onde o player2 saiu, etc.
        }
      });
      if (removedRoom) {
        emitPendingGamesList(); // As salas personalizadas também aparecem na lista de pendentes? Se sim, atualize.
      }
    });

    socket.on("user:online", async ({ userId, username }) => {
      console.log(
        `[user:online] Recebido para userId: ${userId}, socket.id: ${socket.id}`
      );
      const existingUser = onlineUsers.get(userId);

      if (existingUser && existingUser.socketId !== socket.id) {
        console.log(
          `Backend: Usuário ${username} (${userId}) reconectou. Atualizando socket.id de ${existingUser.socketId} para ${socket.id}.`
        );

        io.to(existingUser.socketId).emit("user:disconnected_by_new_login", {
          message:
            "Você foi desconectado pois se conectou em outro dispositivo.",
        });
        if (io.sockets.sockets.has(existingUser.socketId)) {
          console.log(
            `Backend: Forçando desconexão do socket antigo ${existingUser.socketId}.`
          );
          io.sockets.sockets.get(existingUser.socketId).disconnect(true);
        }

        gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
          if (
            (game.player1.id === userId &&
              game.player1.socketId === existingUser.socketId) ||
            (game.player2?.id === userId &&
              game.player2.socketId === existingUser.socketId)
          ) {
            cancelGracePeriod(gameId);
            const playerRef =
              game.player1.id === userId ? game.player1 : game.player2;
            if (playerRef) {
              playerRef.socketId = socket.id;
              console.log(
                `Backend: Socket ID do jogador ${username} (${userId}) atualizado no jogo ${gameId}.`
              );
              io.to(gameId).emit("player:reconnected", { userId, username });
            }
          }
        });

        pendingGamesByCategory.forEach((queue) => {
          queue.forEach((game) => {
            if (
              game.player1?.id === userId &&
              game.player1.socketId === existingUser.socketId
            ) {
              game.player1.socketId = socket.id;
              console.log(
                `Backend: Socket ID do player1 ${username} (${userId}) atualizado na fila pendente da categoria ${game.config.category}.`
              );
            }
          });
        });
      } else if (!existingUser) {
        console.log(
          `[user:online] Novo usuário ${username} (${userId}) detectado.`
        );
      } else {
        console.log(
          `[user:online] Usuário ${username} (${userId}) já online com o mesmo socket ${socket.id}.`
        );
      }

      onlineUsers.set(userId, { socketId: socket.id, username });
      socket.userId = userId;
      console.log(
        `Backend: Usuário ${username} (${userId}) está online. Total: ${onlineUsers.size}. Socket.userId=${socket.userId}`
      );
      emitPendingGamesList();
    });

    // --- Matchmaking Público (chamado pela MaitingRoomScreen) ---
    socket.on(
      "createGame",
      ({ userId, username, category, numQuestions, quizTime }) => {
        if (!userId || !username) {
          socket.emit("matchmaking:error", {
            message:
              "Dados do usuário ausentes. Por favor, faça login novamente.",
          });
          console.warn(
            `[createGame] Tentativa de criar jogo sem userId ou username. userId: ${userId}, username: ${username}`
          );
          return;
        }
        if (isUserBusy(userId)) {
          // Não passa excludeGameId aqui, pois é um novo jogo/fila.
          socket.emit("matchmaking:error", {
            message: "Você já está em um jogo ou fila de espera!",
          });
          return;
        }

        if (!pendingGamesByCategory.has(category)) {
          pendingGamesByCategory.set(category, new Map());
        }
        const categoryQueue = pendingGamesByCategory.get(category);

        const newGame = {
          id: uuidv4(),
          player1: {
            id: userId,
            username: username,
            socketId: socket.id,
            score: 0,
            isReady: false,
            hasAnswered: false,
          },
          player2: null,
          questions: [],
          currentQuestionIndex: 0,
          isFinished: false,
          config: { category, numQuestions, quizTime },
        };

        setTimeout(() => {
          const stillWaitingGame = categoryQueue.get(newGame.id);
          if (stillWaitingGame && !stillWaitingGame.player2) {
            adicionarBotNaPartida(stillWaitingGame, categoryQueue);
          }
        }, 5000);

        gameLogicFunctions.addGame(newGame.id, newGame);
        categoryQueue.set(newGame.id, newGame);
        socket.join(newGame.id);
        socket.emit("gameCreated", {
          gameId: newGame.id,
          message: `Partida de ${category} criada! Aguardando oponente...`,
        });
        console.log(
          `[MATCHMAKING_PUBLIC] Usuário ${username} criou partida ${newGame.id} na fila de ${category}.`
        );
        emitPendingGamesList();
      }
    );

    socket.on(
      "joinGame",
      ({ userId, username, category, numQuestions, quizTime }) => {
        if (!userId || !username) {
          socket.emit("matchmaking:error", {
            message:
              "Dados do usuário ausentes. Por favor, faça login novamente.",
          });
          console.warn(
            `[joinGame] Tentativa de entrar em jogo sem userId ou username. userId: ${userId}, username: ${username}`
          );
          return;
        }
        if (isUserBusy(userId)) {
          // Não passa excludeGameId aqui, pois é para entrar em um novo jogo
          socket.emit("matchmaking:error", {
            message: "Você já está em um jogo ou fila de espera!",
          });
          return;
        }

        if (!pendingGamesByCategory.has(category)) {
          pendingGamesByCategory.set(category, new Map());
        }
        const categoryQueue = pendingGamesByCategory.get(category);

        let gameToJoin = null;
        for (let [gameId, game] of categoryQueue.entries()) {
          if (
            game.player1 &&
            !game.player2 &&
            game.config.numQuestions === numQuestions &&
            game.config.quizTime === quizTime
          ) {
            gameToJoin = game;
            break;
          }
        }

        if (gameToJoin) {
          categoryQueue.delete(gameToJoin.id);
          gameToJoin.player2 = {
            id: userId,
            username: username,
            score: 0,
            socketId: socket.id,
            isReady: false,
            hasAnswered: false,
            profileImage: true,
          };
          gameLogicFunctions.addGame(gameToJoin.id, gameToJoin);
          socket.join(gameToJoin.id);
          io.to(gameToJoin.player1.socketId).emit("quickMatch:opponent_found", {
            message: `${username} encontrado! Iniciando partida...`,
          });
          socket.emit("quickMatch:opponent_found", {
            message: `Oponente encontrado! Iniciando partida...`,
          });
          emitGameStarted(gameToJoin);
        } else {
          const newGame = {
            id: uuidv4(),
            player1: {
              id: userId,
              username: username,
              socketId: socket.id,
              score: 0,
              isReady: false,
              hasAnswered: false,
            },
            player2: null,
            questions: [],
            currentQuestionIndex: 0,
            isFinished: false,
            config: { category, numQuestions, quizTime },
          };
          gameLogicFunctions.addGame(newGame.id, newGame);
          categoryQueue.set(newGame.id, newGame);
          socket.join(newGame.id);
          socket.emit("gameCreated", {
            gameId: newGame.id,
            message: `Partida de ${category} criada! Aguardando oponente...`,
          });
        }
        emitPendingGamesList();
      }
    );

    socket.on("matchmaking:join_pending", ({ gameId, userId, username }) => {
      if (!userId || !username) {
        socket.emit("matchmaking:error", {
          message:
            "Dados do usuário ausentes. Por favor, faça login novamente.",
        });
        console.warn(
          `[matchmaking:join_pending] Tentativa de entrar em partida pendente sem userId ou username. userId: ${userId}, username: ${username}`
        );
        return;
      }
      if (isUserBusy(userId)) {
        // Não passa excludeGameId aqui, pois é para entrar em um jogo pendente
        socket.emit("matchmaking:error", {
          message:
            "Você já está em um jogo ou fila de espera e não pode entrar em outra partida.",
        });
        return;
      }

      let gameToJoin = null;
      for (let categoryMap of pendingGamesByCategory.values()) {
        if (categoryMap.has(gameId)) {
          gameToJoin = categoryMap.get(gameId);
          break;
        }
      }

      if (!gameToJoin || gameToJoin.player2) {
        socket.emit("matchmaking:error", {
          message:
            "Esta partida não está mais disponível ou já tem um oponente.",
        });
        emitPendingGamesList();
        return;
      }

      pendingGamesByCategory.get(gameToJoin.config.category)?.delete(gameId);

      gameToJoin.player2 = {
        id: userId,
        username: username,
        score: 0,
        socketId: socket.id,
        isReady: false,
        hasAnswered: false,
      };
      gameLogicFunctions.addGame(gameToJoin.id, gameToJoin);
      socket.join(gameToJoin.id);
      emitGameStarted(gameToJoin);
      emitPendingGamesList();
    });

    // --- LÓGICA DE DESAFIOS PRIVADOS ---

    socket.on(
      "challenge:create",
      async ({ opponentId, category, numQuestions, quizTime }) => {
        console.log(
          `[CHALLENGE_CREATE_DEBUG] Evento 'challenge:create' recebido. Oponente ID: ${opponentId}, Categoria: ${category}`
        );
        const challengerId = socket.userId;
        if (!challengerId) {
          console.warn(
            "Challenger ID não encontrado para o socket (problema no user:online, ou emissão fora de ordem):",
            socket.id
          );
          socket.emit("challenge:response", {
            type: "error",
            gameId: "N/A",
            message: "Seu ID de usuário não está disponível. Tente reconectar.",
          });
          return;
        }
        const challengerData = onlineUsers.get(challengerId);
        const opponentData = onlineUsers.get(opponentId);

        // Ao criar um desafio, ambos os usuários não podem estar ocupados com outras coisas.
        // Não passa excludeGameId aqui, pois é para garantir que estão LIVRES para um NOVO desafio.
        if (isUserBusy(challengerId)) {
          socket.emit("challenge:response", {
            type: "declined",
            gameId: "N/A",
            message: "Você já está em um jogo ou desafio pendente.",
          });
          console.log(
            `[CHALLENGE_CREATE_DEBUG] Desafiador ${challengerData?.username} já está ocupado. Não pode criar desafio.`
          );
          return;
        }
        if (opponentId && isUserBusy(opponentId)) {
          socket.emit("challenge:response", {
            type: "declined",
            gameId: "N/A",
            message: `O oponente ${
              opponentData?.username || opponentId
            } já está em um jogo ou desafio.`,
          });
          console.log(
            `[CHALLENGE_CREATE_DEBUG] Oponente ${
              opponentData?.username || opponentId
            } já está ocupado. Não pode receber desafio.`
          );
          return;
        }

        if (
          opponentData &&
          opponentData.socketId !== socket.id &&
          challengerData
        ) {
          const gameId = uuidv4();
          const challengeTimeout = setTimeout(() => {
            if (pendingChallenges.has(gameId)) {
              io.to(challengerData.socketId).emit("challenge:response", {
                type: "expired",
                gameId: gameId,
                message: "O desafio expirou.",
              });
              if (onlineUsers.has(opponentId)) {
                io.to(onlineUsers.get(opponentId).socketId).emit(
                  "challenge:canceled",
                  { gameId: gameId, message: "O desafio expirou." }
                );
              }
              pendingChallenges.delete(gameId);
              console.log(
                `[CHALLENGE_CREATE_DEBUG] Desafio ${gameId} expirou e foi limpo.`
              );
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
          console.log(
            `[CHALLENGE_CREATE_DEBUG] Desafio ${gameId} adicionado a pendingChallenges. Tamanho: ${pendingChallenges.size}`
          );

          // Emite evento para o oponente online (Socket.IO)
          io.to(opponentData.socketId).emit("challenge:received", {
            challengerId: challengerId,
            challengerName: challengerData.username,
            gameId: gameId,
            category: category,
            numQuestions: numQuestions,
            quizTime: quizTime,
          });

          // Emite evento para o desafiador (para seu modal de espera)
          socket.emit("challenge:created", {
            gameId: gameId,
            message: `Desafio para ${opponentData.username} criado! Aguardando resposta...`,
          });
          console.log(
            `[CHALLENGE_CREATE_DEBUG] Evento 'challenge:received' emitido para oponente e 'challenge:created' para desafiador.`
          );
        } else {
          console.warn(
            `[CHALLENGE_CREATE_DEBUG] Desafio não processado. Motivo: Oponente offline/ocupado, ou desafiador inválido. OponenteOnline=${!!opponentData}, ChallengerOnline=${!!challengerData}`
          );
          socket.emit("challenge:response", {
            type: "error",
            gameId: "N/A",
            message:
              "Não é possível desafiar este jogador (offline ou ocupado).",
          });
        }
      }
    );

    socket.on("challenge:accept", ({ gameId }) => {
      console.log(
        `[CHALLENGE_ACCEPT_DEBUG] Evento 'challenge:accept' recebido para GameId: ${gameId}`
      );
      const opponentId = socket.userId;
      const challenge = pendingChallenges.get(gameId);

      if (!challenge || opponentId !== challenge.opponentId) {
        console.warn(
          `[CHALLENGE_ACCEPT_DEBUG] CONDIÇÃO FALHA (Aceite): Desafio ${gameId} inválido ou oponente (${opponentId}) não corresponde ao desafiado (${challenge?.opponentId}).`
        );
        if (socket.connected)
          socket.emit("challenge:error", {
            message: "Desafio inválido ou já aceito/recusado.",
          });
        return;
      }

      // ATENÇÃO: isUserBusy agora aceita excludeGameId.
      // Para o oponente que aceita, ele não deve ser considerado ocupado pelo *próprio* desafio que está aceitando.
      if (isUserBusy(opponentId, gameId)) {
        // <--- MUDANÇA AQUI: Passa gameId para excluir da verificação
        console.warn(
          `[CHALLENGE_ACCEPT_DEBUG] Oponente ${opponentId} está ocupado (com outro jogo/desafio) e não pode aceitar o desafio ${gameId}.`
        );
        socket.emit("challenge:response", {
          type: "declined",
          gameId: gameId,
          message: "Você já está em outro jogo ou desafio.",
        });
        const challengerData = onlineUsers.get(challenge.challengerId);
        if (challengerData && challengerData.socketId) {
          io.to(challengerData.socketId).emit("challenge:response", {
            type: "declined",
            gameId: gameId,
            message: `${
              onlineUsers.get(opponentId)?.username || opponentId
            } não pode aceitar o desafio, está ocupado.`,
          });
        }
        clearTimeout(challenge.timeout);
        pendingChallenges.delete(gameId);
        return;
      }

      // Para o desafiador, ele também não deve ser considerado ocupado pelo *próprio* desafio que está sendo aceito.
      const challengerData = onlineUsers.get(challenge.challengerId);
      if (!challengerData || isUserBusy(challenge.challengerId, gameId)) {
        // <--- MUDANÇA AQUI: Passa gameId para excluir da verificação
        console.error(
          `[CHALLENGE_ACCEPT_DEBUG] CONDIÇÃO FALHA (Aceite): Desafiador ${challenge.challengerId} offline ou ocupado (com outro jogo/desafio).`
        );
        socket.emit("challenge:response", {
          type: "error",
          gameId: gameId,
          message: "O desafiador está offline ou ocupado.",
        });
        clearTimeout(challenge.timeout);
        pendingChallenges.delete(gameId);
        return;
      }

      console.log(
        `[CHALLENGE_ACCEPT_DEBUG] Desafio ${gameId} válido. Oponente ${opponentId} aceitando.`
      );
      clearTimeout(challenge.timeout);

      const opponentData = onlineUsers.get(challenge.opponentId);

      if (!challengerData || !opponentData) {
        console.error(
          `[CHALLENGE_ACCEPT_DEBUG] CONDIÇÃO FALHA (Aceite): Desafiador ou oponente offline em onlineUsers. Desafiador online: ${!!challengerData}, Oponente online: ${!!opponentData}.`
        );
        if (challengerData && challengerData.socketId) {
          io.to(challengerData.socketId).emit("challenge:response", {
            type: "error",
            gameId: gameId,
            message: "O oponente saiu ou está offline.",
          });
        }
        return pendingChallenges.delete(gameId);
      }

      io.to(challengerData.socketId).emit("challenge:response", {
        type: "accepted",
        gameId: gameId,
        message: `Seu desafio foi aceito por ${opponentData.username}.`,
      });
      console.log(
        `[CHALLENGE_ACCEPT_DEBUG] Evento 'challenge:response' (accepted) emitido para desafiador ${challengerData.username}.`
      );

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
        currentQuestionIndex: 0,
        isFinished: false,
      };
      gameLogicFunctions.addGame(gameId, newGame);
      const challengerSocket = io.sockets.sockets.get(challengerData.socketId);
      if (challengerSocket) {
        challengerSocket.join(gameId);
      }
      socket.join(gameId);

      console.log(
        `[CHALLENGE_ACCEPT_DEBUG] Chamando emitGameStarted para o jogo ${gameId}.`
      );
      emitGameStarted(newGame);
      console.log(
        `[CHALLENGE_ACCEPT_DEBUG] Desafio ${gameId} removido de pendingChallenges.`
      );
    });

    socket.on("challenge:decline", ({ gameId }) => {
      console.log(
        `[CHALLENGE_DECLINE_DEBUG] Evento 'challenge:decline' recebido para GameId: ${gameId}`
      );
      const challenge = pendingChallenges.get(gameId);
      if (!challenge) {
        console.warn(
          `[CHALLENGE_DECLINE_DEBUG] Desafio ${gameId} não encontrado.`
        );
        return;
      }
      const challengerSocketData = onlineUsers.get(challenge.challengerId);
      if (challengerSocketData && challengerSocketData.socketId) {
        io.to(challengerSocketData.socketId).emit("challenge:response", {
          type: "declined",
          gameId: gameId,
          message: `${
            onlineUsers.get(socket.userId)?.username || "O oponente"
          } recusou o seu convite.`,
        });
      } else {
        console.warn(
          `[CHALLENGE_DECLINE_DEBUG] Socket do desafiador ${challenge.challengerId} não encontrado para notificar sobre recusa.`
        );
      }
      clearTimeout(challenge.timeout);
      pendingChallenges.delete(gameId);
      console.log(
        `[CHALLENGE_DECLINE_DEBUG] Desafio ${gameId} recusado e limpo.`
      );
    });

    socket.on("challenge:cancel_sent", ({ opponentId, gameId }) => {
      console.log(
        `[CHALLENGE_CANCEL_SENT_DEBUG] Evento 'challenge:cancel_sent' recebido para GameId: ${gameId}`
      );
      const challengerId = socket.userId;
      if (!challengerId) {
        console.warn(
          "Challenger ID não encontrado para o socket (cancelamento):",
          socket.id
        );
        return;
      }

      let challengeFound = false;
      for (let [id, challenge] of pendingChallenges.entries()) {
        if (
          id === gameId &&
          challenge.challengerId === challengerId &&
          challenge.opponentId === opponentId
        ) {
          clearTimeout(challenge.timeout);
          pendingChallenges.delete(id);
          challengeFound = true;
          console.log(
            `[CHALLENGE_CANCEL_SENT_DEBUG] Desafio ${gameId} cancelado pelo desafiador ${challengerId}.`
          );

          const opponentSocketData = onlineUsers.get(opponentId);
          if (opponentSocketData && opponentSocketData.socketId) {
            io.to(opponentSocketData.socketId).emit("challenge:canceled", {
              gameId: gameId,
              message:
                "O desafio foi cancelado porque o desafiador se desconectou.",
            });
          }
          break;
        }
      }
      if (!challengeFound) {
        console.warn(
          `[CHALLENGE_CANCEL_SENT_DEBUG] Desafio ${gameId} não encontrado ou não corresponde ao desafiador ${challengerId}.`
        );
      }
    });

    socket.on("playerReadyForGame", ({ gameId, userId }) => {
      console.log(
        `[PLAYER_READY_FINAL_DEBUG] Evento 'playerReadyForGame' RECEBIDO!`
      );
      console.log(`[PLAYER_READY_FINAL_DEBUG] GameId recebido: ${gameId}`);
      console.log(`[PLAYER_READY_FINAL_DEBUG] UserId recebido: ${userId}`);
      console.log(
        `[PLAYER_READY_FINAL_DEBUG] Socket ID do jogador: ${socket.id}`
      );
      const game = gameLogicFunctions.getGame(gameId);
      if (!game) {
        console.error(
          `[PLAYER_READY_FINAL_DEBUG] ERRO GRAVE: Jogo ${gameId} NÃO encontrado em activeGames no playerReadyForGame! (Usando gameLogicFunctions.getGame())`
        );
        console.log(
          `[PLAYER_READY_FINAL_DEBUG] activeGames.keys() atuais via gameLogicFunctions.getActiveGames():`,
          Array.from(gameLogicFunctions.getActiveGames().keys())
        );
        return;
      }
      console.log(
        `[PLAYER_READY_FINAL_DEBUG] Jogo ${gameId} ENCONTRADO em activeGames.`
      );
      cancelGracePeriod(gameId);
      const player = game.player1.id === userId ? game.player1 : game.player2;
      if (player) {
        console.log(
          `[PLAYER_READY_FINAL_DEBUG] Jogador identificado: ${player.username} (ID: ${player.id})`
        );
        socket.join(gameId);
        player.socketId = socket.id;
        player.isReady = true;
        console.log(
          `[PLAYER_READY_FINAL_DEBUG] Jogador ${player.username} marcado como PRONTO.`
        );
        console.log(
          `[PLAYER_READY_FINAL_DEBUG] Estado de isReady - Player1: ${game.player1.isReady}, Player2: ${game.player2?.isReady}`
        );
      } else {
        console.error(
          `[PLAYER_READY_FINAL_DEBUG] ERRO: Jogador ${userId} não encontrado no objeto do jogo ${gameId}.`
        );
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
        console.log(
          `Backend: Aguardando o outro jogador ficar pronto para ${gameId}.`
        );
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(
        `Backend: Socket ${socket.id} desconectado. Razão: ${reason}`
      );
      const userId = socket.userId;

      if (userId) {
        const currentUserData = onlineUsers.get(userId);
        if (currentUserData && currentUserData.socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(
            `Backend: Usuário ${userId} (${currentUserData.username}) removido de onlineUsers. Total: ${onlineUsers.size}`
          );
        } else if (currentUserData) {
          console.log(
            `Backend: Socket ${socket.id} desconectou, mas usuário ${userId} já está conectado com novo socket ${currentUserData.socketId}.`
          );
          return;
        } else {
          console.log(
            `Backend: Socket ${socket.id} desconectou, mas userId ${userId} não estava em onlineUsers ou já foi limpo.`
          );
        }
      } else {
        console.log(
          `Backend: Socket ${socket.id} desconectou, sem userId associado (provavelmente nunca emitiu user:online ou desconectou muito rápido).`
        );
      }

      gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
        const isPlayer1 = game.player1.socketId === socket.id;
        const isPlayer2 = game.player2?.socketId === socket.id;

        if (isPlayer1 || isPlayer2) {
          const disconnectedUserId = isPlayer1
            ? game.player1.id
            : game.player2.id;
          const currentOnlineUserData = onlineUsers.get(disconnectedUserId);

          if (
            currentOnlineUserData &&
            currentOnlineUserData.socketId !== socket.id
          ) {
            console.log(
              `Backend: Jogador ${disconnectedUserId} já reconectou para o jogo ${gameId}. Não iniciando grace period.`
            );
            const playerRef = isPlayer1 ? game.player1 : game.player2;
            playerRef.socketId = currentOnlineUserData.socketId;
            cancelGracePeriod(gameId);
            io.to(gameId).emit("player:reconnected", {
              userId: disconnectedUserId,
              username: currentOnlineUserData.username,
            });
            return;
          }

          if (!disconnectTimers.has(gameId)) {
            const timeout = setTimeout(() => {
              const latestGame = gameLogicFunctions.getGame(gameId);
              if (latestGame) {
                const playerInLatestGame = isPlayer1
                  ? latestGame.player1
                  : latestGame.player2;
                if (
                  !playerInLatestGame ||
                  playerInLatestGame.socketId === socket.id ||
                  !onlineUsers.has(disconnectedUserId)
                ) {
                  console.log(
                    `Backend: Jogador ${disconnectedUserId} não reconectou para ${gameId}. Encerrando partida.`
                  );
                  gameLogicFunctions.endGame(gameId, "disconnect", {
                    getGame: gameLogicFunctions.getGame,
                    removeGame: gameLogicFunctions.removeGame,
                  });
                  const gameCategory = latestGame.config.category;
                  if (
                    pendingGamesByCategory.has(gameCategory) &&
                    pendingGamesByCategory.get(gameCategory).has(gameId)
                  ) {
                    pendingGamesByCategory.get(gameCategory).delete(gameId);
                  }
                  emitPendingGamesList();
                } else {
                  console.log(
                    `Backend: Jogador ${disconnectedUserId} reconectou para ${gameId} a tempo. Nada a fazer.`
                  );
                }
              }
              disconnectTimers.delete(gameId);
            }, 15000);
            disconnectTimers.set(gameId, timeout);
            console.log(
              `Backend: Grace period iniciado para jogo ${gameId} devido à desconexão de ${disconnectedUserId}.`
            );

            const otherPlayer = isPlayer1 ? game.player2 : game.player1;
            if (
              otherPlayer &&
              otherPlayer.socketId &&
              io.sockets.sockets.has(otherPlayer.socketId)
            ) {
              io.to(otherPlayer.socketId).emit("player:disconnected", {
                message: "Seu oponente se desconectou temporariamente...",
              });
            } else {
              console.log(
                `Backend: Não foi possível notificar o outro jogador do jogo ${gameId} sobre a desconexão.`
              );
            }
          } else {
            console.log(
              `Backend: Grace period já ativo para jogo ${gameId}. Ignorando nova desconexão do mesmo jogo.`
            );
          }
        }
      });

      pendingGamesByCategory.forEach((categoryMap) => {
        const gamesToRemove = [];
        categoryMap.forEach((game, gameId) => {
          if (
            game.player1?.id === userId &&
            game.player1.socketId === socket.id &&
            game.player2 === null
          ) {
            gamesToRemove.push(gameId);
            console.log(
              `Backend: Player ${userId} da partida pendente ${gameId} desconectou. Removendo partida da fila.`
            );
            gameLogicFunctions.removeGame(gameId);
          }
        });
        gamesToRemove.forEach((gameId) => categoryMap.delete(gameId));
      });
      emitPendingGamesList();

      pendingChallenges.forEach((challenge, gameId) => {
        const isChallengerDisconnected =
          challenge.challengerId === userId &&
          onlineUsers.get(userId)?.socketId !== socket.id;
        const isOpponentDisconnected =
          challenge.opponentId === userId &&
          onlineUsers.get(userId)?.socketId !== socket.id;

        if (
          challenge.challengerId === userId &&
          (onlineUsers.get(userId)?.socketId !== socket.id ||
            !onlineUsers.has(userId))
        ) {
          console.log(
            `Backend: Desafiador ${userId} desconectado ou reconectou em outro socket. Cancelando desafio ${gameId}.`
          );
          clearTimeout(challenge.timeout);
          pendingChallenges.delete(gameId);
          const opponentSocketData = onlineUsers.get(challenge.opponentId);
          if (opponentSocketData && opponentSocketData.socketId) {
            io.to(opponentSocketData.socketId).emit("challenge:canceled", {
              gameId: gameId,
              message:
                "O desafio foi cancelado porque o desafiador se desconectou.",
            });
          }
        } else if (
          challenge.opponentId === userId &&
          (onlineUsers.get(userId)?.socketId !== socket.id ||
            !onlineUsers.has(userId))
        ) {
          console.log(
            `Backend: Oponente ${userId} desconectado ou reconectou em outro socket. Cancelando desafio ${gameId}.`
          );
          clearTimeout(challenge.timeout);
          pendingChallenges.delete(gameId);
          const challengerSocketData = onlineUsers.get(challenge.challengerId);
          if (challengerSocketData && challengerSocketData.socketId) {
            io.to(challengerSocketData.socketId).emit("challenge:response", {
              type: "canceled",
              gameId: gameId,
              message:
                "O desafio foi cancelado porque o oponente se desconectou.",
            });
          }
        }
      });
    });
  };

  return handleConnection;
};

module.exports = { matchmaking, onlineUsers, pendingGamesByCategory };
