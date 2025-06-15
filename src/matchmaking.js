// src/matchmaking.js
const { v4: uuidv4 } = require("uuid");
const { activeGames } = require("./gameLogic");

// --- ESTRUTURAS DE DADOS GLOBAIS ---
// Estas variáveis guardam o estado de todo o sistema de matchmaking.
const pendingGamesByCategory = new Map();
const disconnectTimers = new Map();
const onlineUsers = new Map(); // Mapeia: userId -> { socketId, username }
const pendingChallenges = new Map();

// --- LÓGICA PRINCIPAL DE MATCHMAKING ---
const matchmaking = (io, gameLogicFunctions) => {
  // Esta função é retornada e é chamada para CADA nova conexão.
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

    socket.on("user:online", ({ userId, username }) => {
      onlineUsers.set(userId, { socketId: socket.id, username });
      console.log(
        `Backend: Usuário ${username} (${userId}) está online. Total: ${onlineUsers.size}`
      );
    });

    // --- Matchmaking Público ---
    const handlePublicMatchmaking = (playerData, gameConfig) => {
      const { category } = gameConfig;
      const categoryQueue = pendingGamesByCategory.get(category);

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
        socket.join(gameToJoin.id);
        emitGameStarted(gameToJoin);
      } else {
        const newGame = {
          id: uuidv4(),
          player1: {
            id: playerData.userId,
            username: playerData.username,
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
        activeGames.set(newGame.id, newGame);
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
      ({ opponentId, category, numQuestions, quizTime }) => {
        const challengerId = getUserIdBySocketId(socket.id);
        if (!challengerId) return;
        const challengerData = onlineUsers.get(challengerId);
        const opponentData = onlineUsers.get(opponentId);
        if (opponentData && opponentData.socketId !== socket.id) {
          const gameId = uuidv4();
          console.log(
            `Backend: ${challengerData.username} desafiou ${opponentData.username}.`
          );
          const challengeTimeout = setTimeout(() => {
            if (pendingChallenges.has(gameId)) {
              io.to(socket.id).emit("desafio:expirado");
              pendingChallenges.delete(gameId);
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
          io.to(opponentData.socketId).emit("challenge:received", {
            challengerName: challengerData.username,
            gameId,
          });
          socket.emit("desafio:enviado");
        } else {
          socket.emit("desafio:erro", {
            message: "Não é possível desafiar este jogador.",
          });
        }
      }
    );

    socket.on("challenge:accept", ({ gameId }) => {
      const challenge = pendingChallenges.get(gameId);
      const opponentId = getUserIdBySocketId(socket.id);
      if (!challenge || opponentId !== challenge.opponentId) return;

      clearTimeout(challenge.timeout);
      const challengerData = onlineUsers.get(challenge.challengerId);
      const opponentData = onlineUsers.get(challenge.opponentId);
      if (!challengerData || !opponentData)
        return pendingChallenges.delete(gameId);

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
      activeGames.set(gameId, newGame);
      io.sockets.sockets.get(challengerData.socketId)?.join(gameId);
      socket.join(gameId);
      emitGameStarted(newGame);
      pendingChallenges.delete(gameId);
    });

    

    socket.on("challenge:decline", ({ gameId }) => {
      const challenge = pendingChallenges.get(gameId);
      if (!challenge) return;
      const challengerSocketId = onlineUsers.get(challenge.challengerId);
      if (challengerSocketId)
        io.to(challengerSocketId).emit("desafio:recusado", {
          message: "Seu convite foi recusado.",
        });
      clearTimeout(challenge.timeout);
      pendingChallenges.delete(gameId);
    });

    // --- Gestão do Jogo ---

    socket.on("playerReadyForGame", ({ gameId, userId }) => {
      const game = activeGames.get(gameId);
      if (!game) return;
      cancelGracePeriod(gameId);
      const player = game.player1.id === userId ? game.player1 : game.player2;
      if (player) {
        socket.join(gameId);
        player.socketId = socket.id;
        player.isReady = true;
        console.log(`Backend: ${player.username} está pronto.`);
      }
      if (game.player1.isReady && game.player2?.isReady) {
        console.log(
          `Backend: Ambos prontos para ${gameId}. Configs: ${JSON.stringify(
            game.config
          )}`
        );
        gameLogicFunctions.startGame(gameId);
      }
    });
  };

  return handleConnection;
};

module.exports = matchmaking;
