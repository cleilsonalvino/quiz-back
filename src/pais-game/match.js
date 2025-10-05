const { v4: uuidv4 } = require("uuid");

// --- ESTRUTURAS DE DADOS GLOBAIS ---
const pendingGamesByCategory = new Map();
const disconnectTimers = new Map();
const onlineUsers = new Map();
const pendingChallenges = new Map(); // Mapeia: gameId -> { challengerId, opponentId, category, numQuestions, quizTime, timeout }

// Cache para a última lista de jogos pendentes emitida
let lastEmittedPendingListJson = "[]";

// --- LÓGICA PRINCIPAL DE MATCHMAKING ---
const matchmakingPais = (io, gameLogicFunctions, prisma) => {

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
            io.emit("pais-game:matchmaking:pending_list", pendingList);
            lastEmittedPendingListJson = currentPendingListJson;
            console.log(`[BACKEND] Lista de partidas pendentes emitida: ${pendingList.length} partidas (mudou).`);
        } else {
            // console.log(`[BACKEND] Lista de partidas pendentes não mudou. Não emitindo.`);
        }
    };

    const handleConnection = (socket) => {
        console.log(`Backend: Socket ${socket.id} conectado.`);
        gameLogicFunctions.setupSocketEvents(socket);
        
        // <--- NOVO: Configura os eventos para salas privadas no novo arquivo
        // // setupRoomEvents(io, socket, { onlineUsers, pendingChallenges, gameLogicFunctions });


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
            io.to(game.player1.socketId).emit("pais-game:gameStarted", payload);
            io.to(game.player2.socketId).emit("pais-game:gameStarted", payload);
            console.log(`[emitGameStarted DEBUG] Evento 'gameStarted' emitido para GameId: ${game.id}`);

            if (pendingChallenges.has(game.id)) {
                clearTimeout(pendingChallenges.get(game.id).timeout);
                pendingChallenges.delete(game.id);
                console.log(`[emitGameStarted DEBUG] Desafio ${game.id} limpo após início do jogo.`);
            }

            if (pendingGamesByCategory.has(game.config.category)) {
                pendingGamesByCategory.get(game.config.category).delete(game.id);
                console.log(`[emitGameStarted DEBUG] Jogo ${game.id} removido da fila de categoria ${game.config.category}.`);
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
            for (const [gameId, game] of gameLogicFunctions.getActiveGames().entries()) {
                if (!game.isFinished && (game.player1?.id === userId || game.player2?.id === userId)) {
                    console.log(`[isUserBusy] Usuário ${userId} está em jogo ativo ${gameId}.`);
                    return true;
                }
            }

            // 2. Verificar em jogos pendentes (fila de matchmaking público)
            for (const categoryMap of pendingGamesByCategory.values()) {
                for (const [gameId, game] of categoryMap.entries()) {
                    if (game.player1?.id === userId && game.player2 === null) {
                        console.log(`[isUserBusy] Usuário ${userId} está na fila de matchmaking público ${gameId}.`);
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
                if (challenge.challengerId === userId || challenge.opponentId === userId) {
                    console.log(`[isUserBusy] Usuário ${userId} está em DESAFIO PENDENTE (diferente de ${excludeGameId}) ${gameId}.`);
                    return true;
                }
            }
            console.log(`[isUserBusy] Usuário ${userId} está LIVRE (Verificado, excluindo desafio ${excludeGameId}).`);
            return false;
        };


        // =================================================================
        // LISTENERS DE SOCKET
        // =================================================================

        socket.on("pais-game:matchmaking:leave_queue_or_room", ({ userId }) => {
            console.log(`[matchmaking:leave_queue_or_room] Usuário ${userId} solicitou saída da fila/sala.`);

            // 1. Procurar e remover de pendingGamesByCategory (filas públicas)
            let removedFromPendingQueue = false;
            pendingGamesByCategory.forEach((categoryMap, categoryName) => {
                const gamesToRemove = [];
                categoryMap.forEach((game, gameId) => {
                    // Se o usuário é o player1 da fila (o criador da vaga)
                    if (game.player1?.id === userId && !game.player2) {
                        gamesToRemove.push(gameId);
                        console.log(`[matchmaking:leave_queue_or_room] Removendo partida pública ${gameId} da fila de ${categoryName} (criada por ${userId}).`);
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
                        console.log(`[matchmaking:leave_queue_or_room] Player2 ${userId} saiu de uma partida pendente ${gameId}.`);
                        // Você pode adicionar uma lógica mais complexa aqui
                        // para lidar com este caso, como notificar player1
                        // ou forçar a remoção da partida. Por enquanto, a
                        // remoção do player1 já é o foco principal.
                    }
                });
                gamesToRemove.forEach(gameId => categoryMap.delete(gameId));
            });
            if (removedFromPendingQueue) {
                emitPendingGamesList(); // Atualiza a lista para todos os clientes
            }

            // 2. Procurar e remover de pendingChallenges (desafios pendentes)
            let removedChallengeId = null;
            pendingChallenges.forEach((challenge, gameId) => {
                if (challenge.challengerId === userId || challenge.opponentId === userId) {
                    console.log(`[matchmaking:leave_queue_or_room] Removendo desafio pendente ${gameId} (envolvendo ${userId}).`);
                    clearTimeout(challenge.timeout);
                    pendingChallenges.delete(gameId);
                    removedChallengeId = gameId; // Guarda o ID do desafio removido
                    // Notificar o outro jogador do desafio que ele foi cancelado/abandonado
                    const otherPlayerId = challenge.challengerId === userId ? challenge.opponentId : challenge.challengerId;
                    const otherPlayerSocketData = onlineUsers.get(otherPlayerId);
                    if (otherPlayerSocketData && otherPlayerSocketData.socketId) {
                        io.to(otherPlayerSocketData.socketId).emit("pais-game:challenge:canceled", { gameId: gameId, message: "O oponente saiu da tela de espera." });
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
                if (game.isCustomRoom && (game.player1?.id === userId || game.player2?.id === userId)) {
                    // Se a sala tem apenas um jogador e ele saiu
                    if (game.player1 && !game.player2 && game.player1.id === userId) {
                        console.log(`[matchmaking:leave_queue_or_room] Sala personalizada vazia ${gameId} removida.`);
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

        socket.on("pais-game:user:online", async ({ userId, username }) => {
            console.log(`[user:online] Recebido para userId: ${userId}, socket.id: ${socket.id}`);
            const existingUser = onlineUsers.get(userId);

            if (existingUser && existingUser.socketId !== socket.id) {
                console.log(`Backend: Usuário ${username} (${userId}) reconectou. Atualizando socket.id de ${existingUser.socketId} para ${socket.id}.`);

                io.to(existingUser.socketId).emit("pais-game:user:disconnected_by_new_login", { message: "Você foi desconectado pois se conectou em outro dispositivo." });
                if (io.sockets.sockets.has(existingUser.socketId)) {
                    console.log(`Backend: Forçando desconexão do socket antigo ${existingUser.socketId}.`);
                    io.sockets.sockets.get(existingUser.socketId).disconnect(true);
                }

                gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
                    if ((game.player1.id === userId && game.player1.socketId === existingUser.socketId) ||
                        (game.player2?.id === userId && game.player2.socketId === existingUser.socketId)) {
                        cancelGracePeriod(gameId);
                        const playerRef = (game.player1.id === userId) ? game.player1 : game.player2;
                        if (playerRef) {
                            playerRef.socketId = socket.id;
                            console.log(`Backend: Socket ID do jogador ${username} (${userId}) atualizado no jogo ${gameId}.`);
                            io.to(gameId).emit("pais-game:player:reconnected", { userId, username });
                        }
                    }
                });

                pendingGamesByCategory.forEach(queue => {
                    queue.forEach(game => {
                        if (game.player1?.id === userId && game.player1.socketId === existingUser.socketId) {
                            game.player1.socketId = socket.id;
                            console.log(`Backend: Socket ID do player1 ${username} (${userId}) atualizado na fila pendente da categoria ${game.config.category}.`);
                        }
                    });
                });
            } else if (!existingUser) {
                console.log(`[user:online] Novo usuário ${username} (${userId}) detectado.`);
            } else {
                console.log(`[user:online] Usuário ${username} (${userId}) já online com o mesmo socket ${socket.id}.`);
            }

            onlineUsers.set(userId, { socketId: socket.id, username });
            socket.userId = userId;
            console.log(`Backend: Usuário ${username} (${userId}) está online. Total: ${onlineUsers.size}. Socket.userId=${socket.userId}`);
            emitPendingGamesList();
        });

        socket.on(
            "pais-game:createGameFriend",
            ({ userId, username, category, numQuestions, quizTime, friendId }) => {
                if (!userId || !username) {
                    socket.emit("pais-game:matchmaking:error", { message: "Dados do usuário ausentes. Por favor, faça login novamente." });
                    return;
                }
                if (isUserBusy(userId)) {
                    socket.emit("pais-game:matchmaking:error", { message: "Você já está em um jogo ou fila de espera!" });
                    return;
                }

                const friendSocketData = onlineUsers.get(friendId);
                if (!friendSocketData) {
                    socket.emit("pais-game:matchmaking:error", { message: "Seu amigo não está online." });
                    return;
                }

                if (isUserBusy(friendId)) {
                    socket.emit("pais-game:matchmaking:error", { message: "Seu amigo já está em um jogo ou fila de espera!" });
                    return;
                }

                const newGame = {
                    id: uuidv4(),
                    player1: { id: userId, username: username, socketId: socket.id, score: 0, isReady: false, hasAnswered: false },
                    player2: { id: friendId, username: friendSocketData.username, socketId: friendSocketData.socketId, score: 0, isReady: false, hasAnswered: false },
                    questions: [],
                    currentQuestionIndex: 0,
                    isFinished: false,
                    config: { category, numQuestions, quizTime },
                };

                gameLogicFunctions.addGame(newGame.id, newGame);
                socket.join(newGame.id);
                io.to(friendSocketData.socketId).join(newGame.id);
                
                io.to(friendSocketData.socketId).emit("pais-game:friendGameInvite", newGame);
                
                emitGameStarted(newGame);
            }
        );

        // --- Matchmaking Público (chamado pela MaitingRoomScreen) ---
        socket.on(
            "pais-game:matchmaking:join_pending",
            ({ userId, username, category, numQuestions, quizTime }) => {
                if (!userId || !username) {
                    socket.emit("pais-game:matchmaking:error", { message: "Dados do usuário ausentes. Por favor, faça login novamente." });
                    return;
                }
                if (isUserBusy(userId)) { // Não passa excludeGameId aqui, pois é um novo jogo/fila.
                    socket.emit("pais-game:matchmaking:error", { message: "Você já está em um jogo ou fila de espera!" });
                    return;
                }

                console.log('chegou aqui!')

                if (!pendingGamesByCategory.has(category)) {
                    pendingGamesByCategory.set(category, new Map());
                }
                const categoryQueue = pendingGamesByCategory.get(category);

                const newGame = {
                    id: uuidv4(),
                    player1: { id: userId, username: username, socketId: socket.id, score: 0, isReady: false, hasAnswered: false },
                    player2: null,
                    questions: [],
                    currentQuestionIndex: 0,
                    isFinished: false,
                    config: { category, numQuestions, quizTime },
                };

                gameLogicFunctions.addGame(newGame.id, newGame);
                categoryQueue.set(newGame.id, newGame);
                socket.join(newGame.id);
                socket.emit("pais-game:gameCreated", { gameId: newGame.id, message: `Partida de ${category} criada! Aguardando oponente...` });
                console.log(`[MATCHMAKING_PUBLIC] Usuário ${username} criou partida ${newGame.id} na fila de ${category}.`);
                emitPendingGamesList();
            }
        );


        socket.on(
            "pais-game:joinGame",
            ({ userId, username, category, numQuestions, quizTime }) => {
                if (!userId || !username) {
                    socket.emit("pais-game:matchmaking:error", { message: "Dados do usuário ausentes. Por favor, faça login novamente." });
                    console.warn(`[joinGame] Tentativa de entrar em jogo sem userId ou username. userId: ${userId}, username: ${username}`);
                    return;
                }
                if (isUserBusy(userId)) { // Não passa excludeGameId aqui, pois é para entrar em um novo jogo
                    socket.emit("pais-game:matchmaking:error", { message: "Você já está em um jogo ou fila de espera!" });
                    return;
                }

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
                    gameToJoin.player2 = { id: userId, username: username, score: 0, socketId: socket.id, isReady: false, hasAnswered: false, profileImage: true, };
                    gameLogicFunctions.addGame(gameToJoin.id, gameToJoin);
                    socket.join(gameToJoin.id);
                    io.to(gameToJoin.player1.socketId).emit("pais-game:quickMatch:opponent_found", { message: `${username} encontrado! Iniciando partida...` });
                    socket.emit("pais-game:quickMatch:opponent_found", { message: `Oponente encontrado! Iniciando partida...` });
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
                    socket.emit("pais-game:gameCreated", { gameId: newGame.id, message: `Partida de ${category} criada! Aguardando oponente...`, });
                }
                emitPendingGamesList();
            }
        );

        socket.on(
            "pais-game:matchmaking:join_pending",
            ({ gameId, userId, username }) => {
                if (!userId || !username) {
                    socket.emit("pais-game:matchmaking:error", { message: "Dados do usuário ausentes. Por favor, faça login novamente." });
                    console.warn(`[matchmaking:join_pending] Tentativa de entrar em partida pendente sem userId ou username. userId: ${userId}, username: ${username}`);
                    return;
                }
                if (isUserBusy(userId)) { // Não passa excludeGameId aqui, pois é para entrar em um jogo pendente
                    socket.emit("pais-game:matchmaking:error", { message: "Você já está em um jogo ou fila de espera e não pode entrar em outra partida." });
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
                    socket.emit("pais-game:matchmaking:error", { message: "Esta partida não está mais disponível ou já tem um oponente." });
                    emitPendingGamesList();
                    return;
                }

                pendingGamesByCategory.get(gameToJoin.config.category)?.delete(gameId);

                gameToJoin.player2 = { id: userId, username: username, score: 0, socketId: socket.id, isReady: false, hasAnswered: false, };
                gameLogicFunctions.addGame(gameToJoin.id, gameToJoin);
                socket.join(gameToJoin.id);
                emitGameStarted(gameToJoin);
                emitPendingGamesList();
            }
        );

        // --- LÓGICA DE DESAFIOS PRIVADOS ---
        // ESTA LÓGICA FOI MOVIDA PARA O ARQUIVO src/room.js
        // A lógica do disconnect permanece aqui, pois precisa gerenciar todos os tipos de jogos, incluindo os de sala
        socket.on("pais-game:playerReadyForGame", ({ gameId, userId }) => {
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
                if (currentUserData && currentUserData.socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`Backend: Usuário ${userId} (${currentUserData.username}) removido de onlineUsers. Total: ${onlineUsers.size}`);
                }
                else if (currentUserData) {
                    console.log(`Backend: Socket ${socket.id} desconectou, mas usuário ${userId} já está conectado com novo socket ${currentUserData.socketId}.`);
                    return;
                }
                else {
                    console.log(`Backend: Socket ${socket.id} desconectou, mas userId ${userId} não estava em onlineUsers ou já foi limpo.`);
                }
            } else {
                console.log(`Backend: Socket ${socket.id} desconectou, sem userId associado (provavelmente nunca emitiu user:online ou desconectou muito rápido).`);
            }

            gameLogicFunctions.getActiveGames().forEach((game, gameId) => {
                const isPlayer1 = game.player1.socketId === socket.id;
                const isPlayer2 = game.player2?.socketId === socket.id;

                if (isPlayer1 || isPlayer2) {
                    const disconnectedUserId = isPlayer1 ? game.player1.id : game.player2.id;
                    const currentOnlineUserData = onlineUsers.get(disconnectedUserId);

                    if (currentOnlineUserData && currentOnlineUserData.socketId !== socket.id) {
                        console.log(`Backend: Jogador ${disconnectedUserId} já reconectou para o jogo ${gameId}. Não iniciando grace period.`);
                        const playerRef = isPlayer1 ? game.player1 : game.player2;
                        if (playerRef) {
                            playerRef.socketId = currentOnlineUserData.socketId;
                            console.log(`Backend: Socket ID do jogador ${username} (${userId}) atualizado no jogo ${gameId}.`);
                            io.to(gameId).emit("pais-game:player:reconnected", { userId: disconnectedUserId, username: currentOnlineUserData.username });
                        }
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
                                    emitPendingGamesList();
                                } else {
                                    console.log(`Backend: Jogador ${disconnectedUserId} reconectou para ${gameId} a tempo. Nada a fazer.`);
                                }
                            }
                            disconnectTimers.delete(gameId);
                        }, 15000);
                        disconnectTimers.set(gameId, timeout);
                        console.log(`Backend: Grace period iniciado para jogo ${gameId} devido à desconexão de ${disconnectedUserId}.`);

                        const otherPlayer = isPlayer1 ? game.player2 : game.player1;
                        if (otherPlayer && otherPlayer.socketId && io.sockets.sockets.has(otherPlayer.socketId)) {
                            io.to(otherPlayer.socketId).emit("pais-game:player:disconnected", { message: "Seu oponente se desconectou temporariamente..." });
                        } else {
                            console.log(`Backend: Não foi possível notificar o outro jogador do jogo ${gameId} sobre a desconexão.`);
                        }
                    } else {
                        console.log(`Backend: Grace period já ativo para jogo ${gameId}. Ignorando nova desconexão do mesmo jogo.`);
                    }
                }
            });

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
            emitPendingGamesList();

            pendingChallenges.forEach((challenge, gameId) => {
                const isChallengerDisconnected = challenge.challengerId === userId && onlineUsers.get(userId)?.socketId !== socket.id;
                const isOpponentDisconnected = challenge.opponentId === userId && onlineUsers.get(userId)?.socketId !== socket.id;

                if (challenge.challengerId === userId && (onlineUsers.get(userId)?.socketId !== socket.id || !onlineUsers.has(userId))) {
                    console.log(`Backend: Desafiador ${userId} desconectado ou reconectou em outro socket. Cancelando desafio ${gameId}.`);
                    clearTimeout(challenge.timeout);
                    pendingChallenges.delete(gameId);
                    const opponentSocketData = onlineUsers.get(challenge.opponentId);
                    if (opponentSocketData && opponentSocketData.socketId) {
                        io.to(opponentSocketData.socketId).emit("pais-game:challenge:canceled", { gameId: gameId, message: "O desafio foi cancelado porque o desafiador se desconectou." });
                    }
                } else if (challenge.opponentId === userId && (onlineUsers.get(userId)?.socketId !== socket.id || !onlineUsers.has(userId))) {
                    console.log(`Backend: Oponente ${userId} desconectado ou reconectou em outro socket. Cancelando desafio ${gameId}.`);
                    clearTimeout(challenge.timeout);
                    pendingChallenges.delete(gameId);
                    const challengerSocketData = onlineUsers.get(challenge.challengerId);
                    if (challengerSocketData && challengerSocketData.socketId) {
                        io.to(challengerSocketData.socketId).emit("pais-game:challenge:response", { type: "canceled", gameId: gameId, message: "O desafio foi cancelado porque o oponente se desconectou." });
                    }
                }
            });
        });
    };

    return handleConnection;
};

module.exports = { matchmakingPais, onlineUsers, pendingGamesByCategory };
