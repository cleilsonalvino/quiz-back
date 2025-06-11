// src/matchmaking.js
const { v4: uuidv4 } = require('uuid');
const { activeGames, shuffleArray, getQuestionsByCategory } = require('./gameLogic');

let startTimerFunction;
let endGameFunction;
let setupSocketEventsFunction;

const pendingGamesByCategory = new Map();
const disconnectTimers = new Map(); // Map<userId, setTimeoutId>

const matchmaking = (io, socket, gameLogicFunctions) => {
    startTimerFunction = gameLogicFunctions.startTimer;
    endGameFunction = gameLogicFunctions.endGame;
    setupSocketEventsFunction = gameLogicFunctions.setupSocketEvents;

    console.log(`Backend: Socket ${socket.id} conectado para matchmaking.`);
    setupSocketEventsFunction(socket); // Configura os eventos de jogo para ESTE socket.

    socket.on('createGame', ({ userId, username, category, numQuestions, quizTime }) => {
        console.log(`Backend: createGame recebido de ${username} (${userId}) para categoria ${category}.`);
        const gameId = uuidv4();
        const newGame = {
            id: gameId,
            player1: { id: userId, username: username, score: 0, socketId: socket.id, isReady: false },
            player2: null,
            questions: [],
            currentQuestionIndex: 0,
            timer: null,
            config: { category, numQuestions, quizTime }
        };

        activeGames.set(gameId, newGame);
        console.log(`Backend: Jogo ${gameId} adicionado a activeGames. Tamanho: ${activeGames.size}`);
        
        if (!pendingGamesByCategory.has(category)) {
            pendingGamesByCategory.set(category, new Map());
        }
        pendingGamesByCategory.get(category).set(gameId, newGame);
        console.log(`Backend: Jogo ${gameId} adicionado a pendingGamesByCategory para ${category}. Tamanho: ${pendingGamesByCategory.get(category).size}`);

        socket.join(gameId); // O criador da partida entra na sala do Socket.io
        console.log(`Backend: Socket ${socket.id} (P1) juntou-se à sala ${gameId} após createGame.`);
        socket.emit('gameCreated', { gameId, message: 'Partida criada! Aguardando oponente...' });
        console.log(`Backend: Partida ${gameId} criada por ${username} na categoria ${category}.`);
    });

    socket.on('joinGame', ({ userId, username, category, gameId = null }) => {
        console.log(`Backend: joinGame recebido de ${username} (${userId}) para categoria ${category}, gameId: ${gameId || 'aleatório'}.`);
        let gameToJoin = null;

        if (gameId) {
            gameToJoin = activeGames.get(gameId);
            if (gameToJoin && !gameToJoin.player2) {
                gameToJoin.player2 = { id: userId, username: username, score: 0, socketId: socket.id, isReady: false };
                if (pendingGamesByCategory.has(category)) {
                    pendingGamesByCategory.get(category).delete(gameId);
                    if (pendingGamesByCategory.get(category).size === 0) {
                        pendingGamesByCategory.delete(category);
                    }
                }
                console.log(`Backend: Jogador ${username} se juntou à partida ${gameId} por ID.`);
            } else {
                socket.emit('joinFailed', { message: 'Partida não encontrada ou já cheia.' });
                console.log(`Backend: Falha ao entrar na partida ${gameId}: não encontrada ou cheia.`);
                return;
            }
        } else {
            const categoryPendingGames = pendingGamesByCategory.get(category);
            if (categoryPendingGames && categoryPendingGames.size > 0) {
                const firstPendingGameId = categoryPendingGames.keys().next().value;
                gameToJoin = categoryPendingGames.get(firstPendingGameId);
                gameToJoin.player2 = { id: userId, username: username, score: 0, socketId: socket.id, isReady: false };
                categoryPendingGames.delete(firstPendingGameId);
                if (categoryPendingGames.size === 0) {
                    pendingGamesByCategory.delete(category);
                }
                console.log(`Backend: Jogador ${username} se juntou à partida pendente ${gameToJoin.id}.`);
            } else {
                console.log(`Backend: Nenhuma partida pendente na categoria ${category}. Criando uma nova para ${username}.`);
                const newGameId = uuidv4();
                const newGame = {
                    id: newGameId,
                    player1: { id: userId, username: username, score: 0, socketId: socket.id, isReady: false },
                    player2: null,
                    questions: [],
                    currentQuestionIndex: 0,
                    timer: null,
                    config: { category, numQuestions: 10, quizTime: 60 }
                };
                activeGames.set(newGameId, newGame);
                console.log(`Backend: Novo jogo ${newGameId} adicionado a activeGames por join aleatório. Tamanho: ${activeGames.size}`);
                
                if (!pendingGamesByCategory.has(category)) {
                    pendingGamesByCategory.set(category, new Map());
                }
                pendingGamesByCategory.get(category).set(newGameId, newGame);
                console.log(`Backend: Novo jogo ${newGameId} adicionado a pendingGamesByCategory. Tamanho: ${pendingGamesByCategory.get(category).size}`);
                
                socket.join(newGameId);
                console.log(`Backend: Socket ${socket.id} (P1_Aleatorio) juntou-se à sala ${newGameId} após criar.`);
                socket.emit('gameCreated', { gameId: newGameId, message: 'Nenhuma partida encontrada. Criando uma nova e aguardando oponente...' });
                console.log(`Backend: Partida ${newGameId} criada por ${username} (aleatório) na categoria ${category}.`);
                return;
            }
        }

        if (gameToJoin && gameToJoin.player2) {
            socket.join(gameToJoin.id); // Certifique-se que o P2 inicial também entra na sala
            console.log(`Backend: Socket ${socket.id} (P2) juntou-se à sala ${gameToJoin.id} após joinGame.`);

            console.log(`Backend: Partida ${gameToJoin.id} pronta. Emitindo gameStarted para P1 (${gameToJoin.player1.username}) e P2 (${gameToJoin.player2.username}).`);
            
            io.to(gameToJoin.player1.socketId).emit('gameStarted', {
                gameId: gameToJoin.id,
                opponent: { id: gameToJoin.player2.id, username: gameToJoin.player2.username },
                config: gameToJoin.config,
                message: 'Oponente encontrado! O jogo vai começar.'
            });
            if(gameToJoin.player2.id !== 'BOT') {
                io.to(gameToJoin.player2.socketId).emit('gameStarted', {
                    gameId: gameToJoin.id,
                    opponent: { id: gameToJoin.player1.id, username: gameToJoin.player1.username },
                    config: gameToJoin.config,
                    message: 'Oponente encontrado! O jogo vai começar.'
                });
            } else {
                console.log(`Backend: Bot conectado à partida ${gameToJoin.id}.`);
            }
        } else {
            socket.emit('joinFailed', { message: 'Não foi possível encontrar ou criar uma partida.' });
            console.log('Backend: Erro: GameToJoin ou player2 é nulo após a tentativa de junção.');
        }
    });

    socket.on('disconnect', () => {
        const disconnectedSocketId = socket.id;
        console.log(`Backend: Socket ${disconnectedSocketId} se desconectou. Iniciando grace period.`);

        let disconnectedUserId = null;
        let disconnectedGame = null;
        for (let [gameId, game] of activeGames) {
            if (game.player1.socketId === disconnectedSocketId) {
                disconnectedUserId = game.player1.id;
                disconnectedGame = game;
                break;
            }
            if (game.player2 && game.player2.socketId === disconnectedSocketId) {
                disconnectedUserId = game.player2.id;
                disconnectedGame = game;
                break;
            }
        }

        if (!disconnectedUserId || !disconnectedGame) {
            console.log(`Backend: Socket ${disconnectedSocketId} desconectado, mas não encontrado em partida ativa ou pendente.`);
            return;
        }

        if (disconnectTimers.has(disconnectedUserId)) {
            clearTimeout(disconnectTimers.get(disconnectedUserId));
            disconnectTimers.delete(disconnectedUserId);
            console.log(`Backend: Grace period cancelado para ${disconnectedUserId}. Reconexão rápida detectada.`);
            return;
        }

        const gracePeriodMs = 5000;
        const timerId = setTimeout(() => {
            console.log(`Backend: Grace period para ${disconnectedUserId} (socket ${disconnectedSocketId}) expirou. Processando desconexão definitiva da partida ${disconnectedGame.id}.`);
            
            const game = activeGames.get(disconnectedGame.id);
            if (!game) return;

            if (game.timer) clearInterval(game.timer);

            let remainingPlayerSocketId = null;
            let remainingPlayerUsername = 'Desconhecido';

            if (game.player1.id === disconnectedUserId && game.player2 && game.player2.id !== 'BOT') {
                remainingPlayerSocketId = game.player2.socketId;
                remainingPlayerUsername = game.player2.username;
            } else if (game.player2 && game.player2.id === disconnectedUserId && game.player1) {
                remainingPlayerSocketId = game.player1.socketId;
                remainingPlayerUsername = game.player1.username;
            }

            if (remainingPlayerSocketId) {
                io.to(remainingPlayerSocketId).emit('opponentDisconnected', { message: `${(game.player1.id === disconnectedUserId ? game.player1.username : (game.player2 ? game.player2.username : 'desconhecido'))} (${disconnectedUserId}) desconectou. Partida encerrada.` });
            } else {
                console.log(`Backend: Oponente não real ou não encontrado para notificar em ${disconnectedGame.id}.`);
            }

            activeGames.delete(disconnectedGame.id);
            console.log(`Backend: Partida ${disconnectedGame.id} removida de activeGames. Novo tamanho: ${activeGames.size}`);

            const category = game.config.category;
            const categoryPendingGamesMap = pendingGamesByCategory.get(category);
            if (categoryPendingGamesMap) {
                categoryPendingGamesMap.delete(disconnectedGame.id);
                if (categoryPendingGamesMap.size === 0) {
                    pendingGamesByCategory.delete(category);
                }
            }
            console.log(`Backend: Partida ${disconnectedGame.id} finalizada por desconexão definitiva.`);
            disconnectTimers.delete(disconnectedUserId);
            
        }, gracePeriodMs);

        disconnectTimers.set(disconnectedUserId, timerId);
    });

    socket.on('playerReadyForGame', ({ gameId, userId }) => {
        console.log(`Backend: 'playerReadyForGame' recebido de ${userId} (socket ${socket.id}) para GameId: ${gameId}`);
        const game = activeGames.get(gameId);
        if (!game) {
            console.warn(`Backend: playerReadyForGame para jogo ${gameId} NÃO ENCONTRADO em activeGames.`);
            socket.emit('gameNotFound', { message: 'Partida não encontrada ou já finalizada.' });
            return;
        }

        // Se este usuário tinha um timer de desconexão pendente, limpa-o! Ele reconectou.
        if (disconnectTimers.has(userId)) {
            clearTimeout(disconnectTimers.get(userId));
            disconnectTimers.delete(userId);
            console.log(`Backend: Grace period CANCELADO para ${userId} na GameId ${gameId}. Reconexão bem-sucedida.`);
        }

        let playerObj = null;
        if (game.player1.id === userId) {
            playerObj = game.player1;
        } else if (game.player2 && game.player2.id === userId) {
            playerObj = game.player2;
        }

        if (playerObj) {
            // === CRUCIAL: Adicionar o socket à sala AQUI e ATUALIZAR o socketId ===
            socket.join(gameId); // Garante que o NOVO socket se junte à sala
            console.log(`Backend: Socket ${socket.id} (userId: ${userId}) juntou-se à sala ${gameId} via playerReadyForGame.`); // LOG
            
            if (playerObj.socketId !== socket.id) {
                console.log(`Backend: ATUALIZANDO socketId de ${playerObj.username} (${userId}) de ${playerObj.socketId} para ${socket.id} em GameId ${gameId}.`);
                playerObj.socketId = socket.id;
            }
            playerObj.isReady = true;
            console.log(`Backend: Player ${playerObj.username} (${userId}) está pronto para ${gameId}. isReady: ${playerObj.isReady}. Socket ID: ${playerObj.socketId}`);
        } else {
            console.warn(`Backend: playerReadyForGame de usuário desconhecido ${userId} para jogo ${gameId}.`);
            return;
        }

        // Se ambos os jogadores estiverem prontos, INICIA O JOGO!
        if (game.player1.isReady && game.player2 && game.player2.isReady) {
            console.log(`Backend: AMBOS OS JOGADORES EM ${gameId} ESTÃO PRONTOS. INICIANDO TIMER E ENVIANDO PERGUNTA.`);
            startTimerFunction(gameId); // Chama a função startTimer do gameLogic
        } else {
            console.log(`Backend: Jogador ${userId} está pronto para ${gameId}. Aguardando o outro.`);
        }
    });

};

module.exports = matchmaking;