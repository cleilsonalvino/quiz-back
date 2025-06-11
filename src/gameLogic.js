// src/gameLogic.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Garante que prisma está instanciado

const { htmlQuestions } = require('./data/htmlQuestions');
const { javascriptQuestions } = require('./data/javascriptQuestions');
const { pythonQuestions } = require('./data/pythonQuestions');
const { cssQuestions } = require('./data/cssQuestions');

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const getQuestionsByCategory = (categoryName) => {
    switch (categoryName) {
        case 'HTML':
            return htmlQuestions;
        case 'JavaScript':
            return javascriptQuestions;
        case 'Python':
            return pythonQuestions;
        case 'CSS':
            return cssQuestions;
        default:
            console.warn(`Backend: Categoria '${categoryName}' não encontrada. Usando perguntas de HTML como padrão.`);
            return htmlQuestions;
    }
};

const activeGames = new Map();

let ioInstance; // Esta variável DEVE ser populada por initGameLogic

const startTimer = (gameId) => {
    const game = activeGames.get(gameId);
    if (!game) {
        console.error(`Backend: Tentativa de iniciar timer para jogo inexistente: ${gameId}`);
        return;
    }
    console.log(`Backend: startTimer chamado para GameId: ${gameId}`);
    console.log(`Backend: Game config: ${JSON.stringify(game.config)}`);

    const selectedGameQuestions = shuffleArray(getQuestionsByCategory(game.config.category))
                                  .slice(0, game.config.numQuestions);
    game.questions = selectedGameQuestions;
    console.log(`Backend: Perguntas para ${game.config.category}: ${game.questions.length}`);

    const clientsInRoom = ioInstance.sockets.adapter.rooms.get(gameId);
    console.log(`Backend: Sockets na sala ${gameId} antes de emitir nextQuestion:`, clientsInRoom ? Array.from(clientsInRoom) : 'Sala vazia ou não existe');


    let timeLeft = game.config.quizTime;
    ioInstance.to(gameId).emit('timerUpdate', timeLeft);
    console.log(`Backend: Emitindo 'timerUpdate' (${timeLeft}s) para GameId: ${gameId}`);

    if (game.questions.length > 0) {
        console.log(`Backend: Enviando primeira pergunta para GameId ${gameId}, Pergunta Index 0. Question ID: ${game.questions[0].id}`);
        ioInstance.to(gameId).emit('nextQuestion', {
            question: game.questions[0],
            questionIndex: 0,
            player1Id: game.player1.id,
            player2Id: game.player2.id,
            player1Username: game.player1.username,
            player2Username: game.player2.username,
            initialTime: game.config.quizTime,
        });
    } else {
        console.warn(`Backend: Partida ${gameId} iniciada sem perguntas. Finalizando.`);
        endGame(gameId);
        return;
    }

    game.timer = setInterval(() => {
        timeLeft--;
        ioInstance.to(gameId).emit('timerUpdate', timeLeft);

        if (timeLeft <= 0) {
            clearInterval(game.timer);
            endGame(gameId);
        }
    }, 1000);
};

const endGame = async (gameId) => {
    const game = activeGames.get(gameId);
    if (!game) return;

    if (game.timer) clearInterval(game.timer);

    console.log(`Backend: Finalizando jogo ${gameId}. Pontuações: P1=${game.player1.score}, P2=${game.player2.score}`);

    // === NOVO: ATUALIZAR PONTUAÇÃO NO BANCO DE DADOS ===
    try {
        // Atualiza a pontuação do Player 1
        await prisma.user.update({
            where: { id: game.player1.id },
            data: { score: { increment: game.player1.score } } // Adiciona a pontuação do jogo à pontuação total
        });
        console.log(`Backend: Pontuação de ${game.player1.username} (${game.player1.id}) atualizada com ${game.player1.score} pontos.`);

        // Atualiza a pontuação do Player 2 (se não for um BOT)
        if(game.player2 && game.player2.id !== 'BOT') { // Adicionado verificação para game.player2
            await prisma.user.update({
                where: { id: game.player2.id },
                data: { score: { increment: game.player2.score } }
            });
            console.log(`Backend: Pontuação de ${game.player2.username} (${game.player2.id}) atualizada com ${game.player2.score} pontos.`);
        } else if (game.player2 && game.player2.id === 'BOT') {
            console.log(`Backend: Oponente é BOT, pontuação não será salva no DB.`);
        } else {
            console.log(`Backend: Jogo de 1 jogador (ou oponente não definido), apenas P1 pontuação atualizada.`);
        }

    } catch (error) {
        console.error(`Backend: ERRO ao atualizar pontuação no DB para o jogo ${gameId}:`, error);
    }
    // === FIM NOVO ===

    ioInstance.to(gameId).emit('gameOver', {
        player1Score: game.player1.score,
        player2Score: game.player2.score,
        totalQuestions: game.questions.length,
        category: game.config.selectedCategory,
        winnerId: game.player1.score > game.player2.score ? game.player1.id :
                  (game.player2.score > game.player1.score ? game.player2.id : null)
    });

    activeGames.delete(gameId);
    console.log(`Backend: Partida ${gameId} finalizada e removida.`);
};

const processAnswer = (socket) => {
    socket.on('submitAnswer', ({ gameId, userId, questionIndex, selectedOption }) => {
        const game = activeGames.get(gameId);
        if (!game || game.currentQuestionIndex !== questionIndex) {
            console.log(`Backend: Resposta inválida para jogo ${gameId} de ${userId}. Índice ${questionIndex} vs ${game ? game.currentQuestionIndex : 'N/A'}`);
            return;
        }
        console.log(`Backend: Resposta recebida para jogo ${gameId}, usuário ${userId}, pergunta ${questionIndex}`);

        const playerKey = game.player1.id === userId ? 'player1' : (game.player2 && game.player2.id === userId ? 'player2' : null); // Adiciona verificação para game.player2
        if (!playerKey) {
            console.log(`Backend: Usuário ${userId} não pertence a esta partida.`);
            return;
        }

        const question = game.questions[questionIndex];
        const isCorrect = (selectedOption === question.correctAnswer);

        if (isCorrect) {
            game[playerKey].score++;
        }

        ioInstance.to(gameId).emit('scoreUpdate', {
            player1Score: game.player1.score,
            player2Score: game.player2.score
        });

        setTimeout(() => {
            game.currentQuestionIndex++;
            if (game.currentQuestionIndex < game.questions.length) {
                console.log(`Backend: Avançando para próxima pergunta para GameId ${gameId}, Pergunta Index ${game.currentQuestionIndex}`);
                ioInstance.to(gameId).emit('nextQuestion', {
                    question: game.questions[game.currentQuestionIndex],
                    questionIndex: game.currentQuestionIndex
                });
            } else {
                console.log(`Backend: Todas as perguntas respondidas para GameId ${gameId}.`);
                endGame(gameId);
            }
        }, 1500);
    });

    socket.on('surrenderGame', ({ gameId, userId }) => {
        const game = activeGames.get(gameId);
        if (!game) {
            console.log(`Backend: Jogo ${gameId} não encontrado para desistência de ${userId}.`);
            return;
        }

        let surrenderedPlayerUsername = 'Desconhecido';
        if (game.player1.id === userId) {
            surrenderedPlayerUsername = game.player1.username;
        } else if (game.player2 && game.player2.id === userId) {
            surrenderedPlayerUsername = game.player2.username;
        }

        console.log(`Backend: Jogador ${surrenderedPlayerUsername} (${userId}) desistiu da partida ${gameId}.`);
        ioInstance.to(gameId).emit('opponentDisconnected', { message: `${surrenderedPlayerUsername} desistiu da partida.` });
        endGame(gameId);
    });
};


module.exports = {
    activeGames,
    shuffleArray,
    getQuestionsByCategory,
    initGameLogic: (ioServer) => {
        ioInstance = ioServer;
        console.log('Backend: gameLogic inicializado com ioInstance.');
        return {
            startTimer,
            endGame,
            setupSocketEvents: (socket) => processAnswer(socket)
        };
    }
};