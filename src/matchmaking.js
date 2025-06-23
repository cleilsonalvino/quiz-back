// src/matchmaking.js
const { v4: uuidv4 } = require("uuid");

// --- ESTRUTURAS DE DADOS GLOBAIS ---
const pendingGamesByCategory = new Map(); // Mapeia category -> Map<gameId, game>
const disconnectTimers = new Map();
const onlineUsers = new Map(); // Mapeia: userId -> { socketId, username, fcmToken }
const pendingChallenges = new Map();

// Cache para a última lista de jogos pendentes emitida, para evitar re-emissões desnecessárias
let lastEmittedPendingListJson = "[]"; 

// --- LÓGICA PRINCIPAL DE MATCHMAKING ---
const matchmaking = (io, gameLogicFunctions, admin, prisma) => {

    // Função para emitir a lista de jogos pendentes para todos os clientes
    // Só emite se a lista mudou
    const emitPendingGamesList = () => {
        const pendingList = [];
        pendingGamesByCategory.forEach((categoryMap, categoryName) => {
            categoryMap.forEach((game) => {
                if (game.player1 && !game.player2) { // Apenas jogos com player1 esperando por player2
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
            lastEmittedPendingListJson = currentPendingListJson; // Atualiza o cache
            console.log(`[BACKEND] Lista de partidas pendentes emitida: ${pendingList.length} partidas (mudou).`);
        } else {
            // console.log(`[BACKEND] Lista de partidas pendentes não mudou. Não emitindo.`); 
        }
    };

    const handleConnection = (socket) => {
        console.log(`Backend: Socket ${socket.id} conectado.`);
        socket.userId = null; 
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

        const getFcmTokenByUserId = async (userId) => {
            try {
                if (!prisma) {
                    console.warn("Prisma client não fornecido ao matchmaking. Não é possível buscar FCM Token.");
                    return null;
                }
                const user = await prisma.user.findUnique({ where: { id: userId }, select: { pushToken: true } });
                return user ? user.pushToken : null;
            } catch (error) {
                console.error(`Erro ao buscar FCM Token para o usuário ${userId}:`, error);
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
            io.to(game.player1.socketId).emit("gameStarted", { ...payload, opponent: payload.player2 });
            io.to(game.player2.socketId).emit("gameStarted", { ...payload, opponent: payload.player1 });
            console.log(`[emitGameStarted DEBUG] Evento 'gameStarted' emitido para GameId: ${game.id}`);

            // Remove o jogo da fila pendente quando ele de fato começa
            if (pendingGamesByCategory.has(game.config.category)) {
                pendingGamesByCategory.get(game.config.category).delete(game.id);
                console.log(`[emitGameStarted DEBUG] Jogo ${game.id} removido da fila de categoria ${game.config.category}.`);
            }
            emitPendingGamesList(); // CHAMA AQUI: Lista mudou (jogo saiu da fila)
        };

        const cancelGracePeriod = (gameId) => {
            if (disconnectTimers.has(gameId)) {
                clearTimeout(disconnectTimers.get(gameId));
                disconnectTimers.delete(gameId);
                console.log(`Backend: Grace period para o jogo ${gameId} cancelado.`);
            }
        };

        // =================================================================
        // LISTENERS DE SOCKET
        // =================================================================

        socket.on("user:online", ({ userId, username, fcmToken }) => {
            const existingUser = onlineUsers.get(userId);

            if (existingUser && existingUser.socketId !== socket.id) {
                console.log(`Backend: Usuário ${username} (${userId}) reconectou. Atualizando socket.id de ${existingUser.socketId} para ${socket.id}.`);
                
                gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
                    if ((game.player1.id === userId && game.player1.socketId === existingUser.socketId) || 
                        (game.player2?.id === userId && game.player2.socketId === existingUser.socketId)) {
                        cancelGracePeriod(gameId);
                        const playerRef = (game.player1.id === userId) ? game.player1 : game.player2; 
                        if (playerRef) {
                            playerRef.socketId = socket.id;
                            console.log(`Backend: Socket ID do jogador ${username} (${userId}) atualizado no jogo ${gameId}.`);
                            io.to(gameId).emit("player:reconnected", { userId, username });
                        }
                    }
                });

                // Atualizar socketId em jogos pendentes na fila
                pendingGamesByCategory.forEach(queue => {
                    queue.forEach(game => {
                        if (game.player1?.id === userId && game.player1.socketId === existingUser.socketId) {
                            game.player1.socketId = socket.id;
                            console.log(`Backend: Socket ID do player1 ${username} (${userId}) atualizado na fila pendente da categoria ${game.config.category}.`);
                        }
                    });
                });
            }

            onlineUsers.set(userId, { socketId: socket.id, username, fcmToken });
            socket.userId = userId; 
            console.log(`Backend: Usuário ${username} (${userId}) está online. Total: ${onlineUsers.size}`);
            emitPendingGamesList(); // CHAMA AQUI: Garante que o novo usuário recebe a lista atual
        });

        // --- Matchmaking Público (chamado pela MaitingRoomScreen) ---
        socket.on(
            "createGame",
            ({ userId, username, category, numQuestions, quizTime }) => {
                let alreadyInGameOrQueue = false;
                gameLogicFunctions.getActiveGames().forEach(game => {
                    if ((game.player1?.id === userId || game.player2?.id === userId) && game.isFinished === false) { alreadyInGameOrQueue = true; }
                });
                pendingGamesByCategory.forEach(queue => {
                    queue.forEach(game => {
                        if (game.player1?.id === userId && game.player2 === null) { alreadyInGameOrQueue = true; }
                    });
                });

                if (alreadyInGameOrQueue) { socket.emit("matchmaking:error", { message: "Você já está em um jogo ou fila de espera!" }); return; }

                if (!pendingGamesByCategory.has(category)) { pendingGamesByCategory.set(category, new Map()); }
                const categoryQueue = pendingGamesByCategory.get(category);

                const newGame = {
                    id: uuidv4(),
                    player1: { id: userId, username: username, socketId: socket.id, score: 0, isReady: false, hasAnswered: false, },
                    player2: null, 
                    questions: [], currentQuestionIndex: 0, isFinished: false,
                    config: { category, numQuestions, quizTime },
                };
                gameLogicFunctions.addGame(newGame.id, newGame); 
                categoryQueue.set(newGame.id, newGame); 
                socket.join(newGame.id); 
                socket.emit("gameCreated", { gameId: newGame.id, message: `Partida de ${category} criada! Aguardando oponente...`, });
                console.log(`[MATCHMAKING_PUBLIC] Usuário ${username} criou partida ${newGame.id} na fila de ${category}.`);
                emitPendingGamesList(); // CHAMA AQUI: Lista mudou (novo jogo na fila)
            }
        );

        socket.on(
            "joinGame", 
            ({ userId, username, category, numQuestions, quizTime }) => {
                let alreadyInGameOrQueue = false;
                gameLogicFunctions.getActiveGames().forEach(game => {
                    if ((game.player1?.id === userId || game.player2?.id === userId) && game.isFinished === false) { alreadyInGameOrQueue = true; }
                });
                pendingGamesByCategory.forEach(queue => {
                    queue.forEach(game => {
                        if (game.player1?.id === userId && game.player2 === null) { alreadyInGameOrQueue = true; }
                    });
                });

                if (alreadyInGameOrQueue) { socket.emit("matchmaking:error", { message: "Você já está em um jogo ou fila de espera!" }); return; }

                if (!pendingGamesByCategory.has(category)) { pendingGamesByCategory.set(category, new Map()); }
                const categoryQueue = pendingGamesByCategory.get(category);

                let gameToJoin = null;
                for (let [gameId, game] of categoryQueue.entries()) {
                    if (game.player1 && !game.player2 && 
                        game.config.numQuestions === numQuestions && 
                        game.config.quizTime === quizTime) {
                        gameToJoin = game;
                        break;
                    }
                }

                if (gameToJoin) {
                    categoryQueue.delete(gameToJoin.id); 
                    gameToJoin.player2 = { id: userId, username: username, score: 0, socketId: socket.id, isReady: false, hasAnswered: false, };
                    gameLogicFunctions.addGame(gameToJoin.id, gameToJoin); 
                    socket.join(gameToJoin.id);
                    io.to(gameToJoin.player1.socketId).emit("quickMatch:opponent_found", { message: `${username} encontrado! Iniciando partida...` });
                    socket.emit("quickMatch:opponent_found", { message: `Oponente encontrado! Iniciando partida...` });
                    emitGameStarted(gameToJoin); 
                } else {
                    const newGame = {
                        id: uuidv4(),
                        player1: { id: userId, username: username, socketId: socket.id, score: 0, isReady: false, hasAnswered: false, },
                        player2: null,
                        questions: [], currentQuestionIndex: 0, isFinished: false,
                        config: { category, numQuestions, quizTime },
                    };
                    gameLogicFunctions.addGame(newGame.id, newGame); 
                    categoryQueue.set(newGame.id, newGame); 
                    socket.join(newGame.id);
                    socket.emit("gameCreated", { gameId: newGame.id, message: `Partida de ${category} criada! Aguardando oponente...`, });
                }
                emitPendingGamesList(); // CHAMA AQUI: Lista mudou (novo jogo na fila ou jogo saiu da fila)
            }
        );

        socket.on(
            "matchmaking:join_pending",
            ({ gameId, userId, username }) => {
                let alreadyInGameOrQueue = false;
                gameLogicFunctions.getActiveGames().forEach(game => {
                    if ((game.player1?.id === userId || game.player2?.id === userId) && game.isFinished === false) { alreadyInGameOrQueue = true; }
                });
                pendingGamesByCategory.forEach(queue => {
                    queue.forEach(game => {
                        if (game.player1?.id === userId && game.player2 === null) { alreadyInGameOrQueue = true; }
                    });
                });

                if (alreadyInGameOrQueue) { socket.emit("matchmaking:error", { message: "Você já está em um jogo ou fila de espera e não pode entrar em outra partida." }); return; }

                let gameToJoin = null;
                for (let categoryMap of pendingGamesByCategory.values()) {
                    if (categoryMap.has(gameId)) {
                        gameToJoin = categoryMap.get(gameId);
                        break;
                    }
                }

                if (!gameToJoin || gameToJoin.player2) { 
                    socket.emit("matchmaking:error", { message: "Esta partida não está mais disponível ou já tem um oponente." });
                    emitPendingGamesList(); 
                    return;
                }

                pendingGamesByCategory.get(gameToJoin.config.category)?.delete(gameId);

                gameToJoin.player2 = { id: userId, username: username, score: 0, socketId: socket.id, isReady: false, hasAnswered: false, };
                gameLogicFunctions.addGame(gameToJoin.id, gameToJoin); 
                socket.join(gameToJoin.id);
                emitGameStarted(gameToJoin); 
                emitPendingGamesList(); // CHAMA AQUI: Lista mudou (jogo saiu da fila)
            }
        );

        socket.on("challenge:create", async ({ opponentId, category, numQuestions, quizTime }) => { 
            console.log(`[CHALLENGE_CREATE_DEBUG] Evento 'challenge:create' recebido. Oponente ID: ${opponentId}, Categoria: ${category}`);
            const challengerId = getUserIdBySocketId(socket.id);
            if (!challengerId) { console.warn("Challenger ID não encontrado para o socket (usuário offline ou problema no user:online):", socket.id); return; }
            const challengerData = onlineUsers.get(challengerId);
            const opponentData = onlineUsers.get(opponentId);
            if (opponentData && opponentData.socketId !== socket.id && challengerData) {
                const gameId = uuidv4();
                const challengeTimeout = setTimeout(() => {
                    if (pendingChallenges.has(gameId)) {
                        io.to(socket.id).emit("desafio:expirado");
                        pendingChallenges.delete(gameId);
                        console.log(`[CHALLENGE_CREATE_DEBUG] Desafio ${gameId} expirou e foi limpo.`);
                    }
                }, 30000);
                pendingChallenges.set(gameId, { challengerId, opponentId, category, numQuestions: numQuestions || 5, quizTime: quizTime || 60, timeout: challengeTimeout });
                console.log(`[CHALLENGE_CREATE_DEBUG] Desafio ${gameId} adicionado a pendingChallenges. Tamanho: ${pendingChallenges.size}`);
                try {
                    let opponentFcmToken = opponentData.fcmToken;
                    if (!opponentFcmToken && prisma) { opponentFcmToken = await getFcmTokenByUserId(opponentId); }
                    console.log(`[FCM Debug] FCM Token final para oponente ${opponentId}:`, opponentFcmToken ? "Obtido" : "NÃO OBTIDO");
                    console.log(`[FCM Debug] Admin SDK disponível?`, !!admin);
                    if (opponentFcmToken && admin) {
                        console.log(`[FCM Debug] CONDIÇÕES PARA ENVIO FCM ATENDIDAS!`);
                        const message = {
                            notification: { title: "Novo Desafio!", body: `${challengerData.username} te desafiou para um quiz de ${category}!` },
                            data: { screen: "ChallengeWaiting", challengerId: challengerId, challengerName: challengerData.username, gameId: gameId, category: category, type: "challenge_request" },
                            token: opponentFcmToken,
                        };
                        const response = await admin.messaging().send(message);
                        console.log("[FCM] Notificação FCM de desafio enviada com sucesso:", response);
                    } else { console.warn(`[FCM] Notificação NÃO enviada: FCM Token (${opponentFcmToken}) ausente ou Firebase Admin SDK não disponível.`); }
                } catch (fcmError) { console.error("[FCM] Erro EXCEPCIONAL ao enviar notificação FCM:", fcmError); }
                io.to(opponentData.socketId).emit("challenge:received", { challengerName: challengerData.username, gameId, });
                socket.emit("desafio:enviado");
                console.log(`[CHALLENGE_CREATE_DEBUG] Evento 'challenge:received' emitido para oponente e 'desafio:enviado' para desafiador.`);
            } else { 
                console.warn(`[CHALLENGE_CREATE_DEBUG] Desafio não processado. Motivo: Oponente offline ou inválido, ou desafiador inválido. OponenteOnline=${!!opponentData}, ChallengerOnline=${!!challengerData}`);
                socket.emit("desafio:erro", { message: "Não é possível desafiar este jogador (offline ou dados inválidos)." }); 
            }
        });

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
                id: gameId, player1: { id: challenge.challengerId, username: challengerData.username, score: 0, socketId: challengerData.socketId, isReady: false, hasAnswered: false, },
                player2: { id: challenge.opponentId, username: opponentData.username, score: 0, socketId: opponentData.socketId, isReady: false, hasAnswered: false, },
                config: { category: challenge.category, numQuestions: challenge.numQuestions, quizTime: challenge.quizTime, },
                questions: [], currentQuestionIndex: 0, isFinished: false,
            };
            gameLogicFunctions.addGame(gameId, newGame);
            console.log(`[CHALLENGE_ACCEPT_DEBUG] Jogo ${gameId} CRIADO via gameLogicFunctions.addGame.`);
            console.log(`[CHALLENGE_ACCEPT_DEBUG] Conteúdo ATUAL de activeGames.keys() APÓS adição:`, Array.from(gameLogicFunctions.getActiveGames().keys()));
            console.log(`[CHALLENGE_ACCEPT_DEBUG] activeGames.get(${gameId}) existe?`, gameLogicFunctions.getGame(gameId) ? "SIM" : "NÃO");
            const challengerSocket = io.sockets.sockets.get(challengerData.socketId);
            if (challengerSocket) { 
                challengerSocket.join(gameId); 
                console.log(`[CHALLENGE_ACCEPT_DEBUG] Desafiador socket ${challengerData.socketId} entrou na sala ${gameId}.`);
            } else { console.warn(`[CHALLENGE_ACCEPT_DEBUG] ERRO: Socket do desafiador ${challengerData.socketId} não encontrado para entrar na sala.`); }
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
            if (!challenge) { console.warn(`[CHALLENGE_DECLINE_DEBUG] Desafio ${gameId} não encontrado.`); return; }
            const challengerSocketData = onlineUsers.get(challenge.challengerId);
            if (challengerSocketData && challengerSocketData.socketId) {
                io.to(challengerSocketData.socketId).emit("desafio:recusado", { message: "Seu convite foi recusado." });
            } else { console.warn(`[CHALLENGE_DECLINE_DEBUG] Socket do desafiador ${challenge.challengerId} não encontrado para notificar sobre recusa.`); }
            clearTimeout(challenge.timeout);
            pendingChallenges.delete(gameId);
            console.log(`[CHALLENGE_DECLINE_DEBUG] Desafio ${gameId} recusado e limpo.`);
        });

        socket.on("playerReadyForGame", ({ gameId, userId }) => {
            console.log(`[PLAYER_READY_FINAL_DEBUG] Evento 'playerReadyForGame' RECEBIDO!`);
            console.log(`[PLAYER_READY_FINAL_DEBUG] GameId recebido: ${gameId}`);
            console.log(`[PLAYER_READY_FINAL_DEBUG] UserId recebido: ${userId}`);
            console.log(`[PLAYER_READY_FINAL_DEBUG] Socket ID do jogador: ${socket.id}`);
            const game = gameLogicFunctions.getGame(gameId);
            if (!game) { console.error(`[PLAYER_READY_FINAL_DEBUG] ERRO GRAVE: Jogo ${gameId} NÃO encontrado em activeGames no playerReadyForGame! (Usando gameLogicFunctions.getGame())`); console.log(`[PLAYER_READY_FINAL_DEBUG] activeGames.keys() atuais via gameLogicFunctions.getActiveGames():`, Array.from(gameLogicFunctions.getActiveGames().keys())); return; }
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
            } else { console.error(`[PLAYER_READY_FINAL_DEBUG] ERRO: Jogador ${userId} não encontrado no objeto do jogo ${gameId}.`); return; }
            if (game.player1.isReady && game.player2?.isReady) {
                console.log(`Backend: Ambos prontos para ${gameId}. Configs: ${JSON.stringify(game.config)}`);
                gameLogicFunctions.startGame(gameId);
            } else { console.log(`Backend: Aguardando o outro jogador ficar pronto para ${gameId}.`); }
        });

        socket.on("disconnect", (reason) => {
            console.log(`Backend: Socket ${socket.id} desconectado. Razão: ${reason}`);
            const userId = socket.userId;

            if (userId) {
                const currentUserData = onlineUsers.get(userId);
                if (currentUserData && currentUserData.socketId === socket.id) { onlineUsers.delete(userId); console.log(`Backend: Usuário ${userId} removido de onlineUsers. Total: ${onlineUsers.size}`); }
                else if (currentUserData) { console.log(`Backend: Socket ${socket.id} desconectou, mas usuário ${userId} já está conectado com novo socket ${currentUserData.socketId}.`); return; }
                else { console.log(`Backend: Socket ${socket.id} desconectou, mas userId ${userId} não encontrado em onlineUsers.`); }
            } else { console.log(`Backend: Socket ${socket.id} desconectou, sem userId associado.`); }

            gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
                const isPlayer1 = game.player1.socketId === socket.id;
                const isPlayer2 = game.player2?.socketId === socket.id;

                if (isPlayer1 || isPlayer2) {
                    const disconnectedUserId = isPlayer1 ? game.player1.id : game.player2.id;
                    const currentOnlineUserData = onlineUsers.get(disconnectedUserId);
                    
                    if (currentOnlineUserData && currentOnlineUserData.socketId !== socket.id) {
                        console.log(`Backend: Jogador ${disconnectedUserId} já reconectou para o jogo ${gameId}. Não iniciando grace period.`);
                        const playerRef = isPlayer1 ? game.player1 : game.player2;
                        playerRef.socketId = currentOnlineUserData.socketId;
                        cancelGracePeriod(gameId);
                        return;
                    }

                    if (!disconnectTimers.has(gameId)) { 
                        const timeout = setTimeout(() => {
                            const latestGame = gameLogicFunctions.getGame(gameId);
                            if (latestGame) {
                                const playerInLatestGame = isPlayer1 ? latestGame.player1 : latestGame.player2;
                                if (!playerInLatestGame || playerInLatestGame.socketId === socket.id || !onlineUsers.has(disconnectedUserId)) {
                                    console.log(`Backend: Jogador ${disconnectedUserId} não reconectou para ${gameId}. Encerrando partida.`);
                                    gameLogicFunctions.endGame(gameId, "disconnect", { getGame: gameLogicFunctions.getGame, removeGame: gameLogicFunctions.removeGame });
                                    const gameCategory = latestGame.config.category;
                                    if (pendingGamesByCategory.has(gameCategory) && pendingGamesByCategory.get(gameCategory).has(gameId)) {
                                        pendingGamesByCategory.get(gameCategory).delete(gameId);
                                    }
                                    emitPendingGamesList(); // CHAMA AQUI: Lista mudou (jogo encerrado)
                                } else { console.log(`Backend: Jogador ${disconnectedUserId} reconectou para ${gameId} a tempo.`); }
                            }
                            disconnectTimers.delete(gameId);
                        }, 15000); 
                        disconnectTimers.set(gameId, timeout);
                        console.log(`Backend: Grace period iniciado para jogo ${gameId} devido à desconexão de ${disconnectedUserId}.`);

                        const otherPlayer = isPlayer1 ? game.player2 : game.player1;
                        if (otherPlayer && otherPlayer.socketId) { io.to(otherPlayer.socketId).emit("player:disconnected", { message: "Seu oponente se desconectou temporariamente..." }); }
                    }
                }
            });

            // Lógica para jogadores esperando em filas pendentes (removê-los da fila)
            pendingGamesByCategory.forEach(categoryMap => {
                const gamesToRemove = [];
                categoryMap.forEach((game, gameId) => {
                    if (game.player1?.id === userId && game.player1.socketId === socket.id && game.player2 === null) {
                        gamesToRemove.push(gameId);
                        console.log(`Backend: Player ${userId} da partida pendente ${gameId} desconectou. Removendo partida da fila.`);
                        gameLogicFunctions.removeGame(gameId);
                    }
                });
                gamesToRemove.forEach(gameId => categoryMap.delete(gameId));
            });
            emitPendingGamesList(); // CHAMA AQUI: Lista mudou (jogador saiu da fila)

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

module.exports = { matchmaking, onlineUsers, pendingGamesByCategory };