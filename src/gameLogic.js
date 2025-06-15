// src/gameLogic.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { htmlQuestions } = require('./data/htmlQuestions');
const { javascriptQuestions } = require('./data/javascriptQuestions');
const { pythonQuestions } = require('./data/pythonQuestions');
const { cssQuestions } = require('./data/cssQuestions');

const activeGames = new Map();
let ioInstance;

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
        case 'HTML': return htmlQuestions;
        case 'JavaScript': return javascriptQuestions;
        case 'Python': return pythonQuestions;
        case 'CSS': return cssQuestions;
        default: return htmlQuestions;
    }
};

const startGame = (gameId) => {
    const game = activeGames.get(gameId);
    if (!game) return;

    const allQuestions = getQuestionsByCategory(game.config.category);
    game.questions = shuffleArray(allQuestions).slice(0, game.config.numQuestions);
    
    if (game.questions.length === 0) {
        ioInstance.to(gameId).emit('error', { message: 'Nenhuma pergunta encontrada para esta categoria.' });
        activeGames.delete(gameId);
        return;
    }

    console.log(`Backend: Jogo ${gameId} iniciado com ${game.questions.length} perguntas.`);
    
    game.currentQuestionIndex = 0;
    advanceToNextQuestion(gameId);
};

const advanceToNextQuestion = (gameId) => {
    const game = activeGames.get(gameId);
    if (!game || game.isFinished) return;

    if (game.questionTimer) {
        clearInterval(game.questionTimer);
    }
    
    // --- NOVO LOG DE DEBUG AQUI ---
    if (game.currentQuestionIndex >= game.questions.length) {
        console.log(`--> CONDIÇÃO DE FIM DE JOGO ATINGIDA (pergunta ${game.currentQuestionIndex}/${game.questions.length}). CHAMANDO endGame...`);
        endGame(gameId);
        return;
    }

    const questionIndex = game.currentQuestionIndex;
    const question = game.questions[questionIndex];

    if(game.player1) game.player1.hasAnswered = false;
    if (game.player2) game.player2.hasAnswered = false;
    
    console.log(`Backend: Enviando pergunta ${questionIndex + 1}/${game.questions.length} para o jogo ${gameId}.`);
    
    ioInstance.to(gameId).emit('nextQuestion', {
        question,
        questionIndex,
        totalQuestions: game.questions.length
    });

    let timeLeft = game.config.quizTime;
    ioInstance.to(gameId).emit('timerUpdate', timeLeft);

    game.questionTimer = setInterval(() => {
        timeLeft--;
        ioInstance.to(gameId).emit('timerUpdate', timeLeft);

        if (timeLeft <= 0) {
            clearInterval(game.questionTimer);
            console.log(`Backend: Tempo da pergunta ${questionIndex} esgotado.`);
            game.currentQuestionIndex++;
            advanceToNextQuestion(gameId);
        }
    }, 1000);
};

const endGame = async (gameId) => {
    // --- NOVO LOG DE DEBUG AQUI ---
    console.log(`--> FUNÇÃO endGame INICIADA para o jogo ${gameId}`);
    const game = activeGames.get(gameId);
    if (!game || game.isFinished) {
        if(game) console.log(`Backend: Tentativa de finalizar jogo ${gameId} que já terminou.`);
        return;
    }

    game.isFinished = true;
    if (game.questionTimer) clearInterval(game.questionTimer); 
    
    console.log(`Backend: Finalizando jogo ${gameId}. Pontuações: P1=${game.player1.score}, P2=${game.player2 ? game.player2.score : 'N/A'}`);

    try {
        if (game.player1) {
            await prisma.user.update({
                where: { id: game.player1.id },
                data: { score: { increment: game.player1.score } }
            });
        }
        if (game.player2 && game.player2.id !== 'BOT') {
            await prisma.user.update({
                where: { id: game.player2.id },
                data: { score: { increment: game.player2.score } }
            });
        }
    } catch (error) {
        console.error(`Backend: Erro ao salvar pontuações para o jogo ${gameId}:`, error);
    }

    const winnerId = (game.player1 && game.player2) ? 
                     (game.player1.score > game.player2.score ? game.player1.id :
                     (game.player2.score > game.player1.score ? game.player2.id : null)) :
                     (game.player1 ? game.player1.id : null);

    // --- NOVO LOG DE DEBUG AQUI ---
    console.log(`--> EMITINDO 'gameOver' para a sala ${gameId}`);
    ioInstance.to(gameId).emit('gameOver', {
        player1Score: game.player1 ? game.player1.score : 0,
        player2Score: game.player2 ? game.player2.score : 0,
        totalQuestions: game.questions.length,
        category: game.config.category,
        numQuestions: game.config.numQuestions,
        quizTime: game.config.quizTime,
        winnerId: winnerId,
    });

    activeGames.delete(gameId);
    console.log(`Backend: Partida ${gameId} finalizada e removida.`);
};

const setupSocketEvents = (socket) => {
    socket.on('submitAnswer', ({ gameId, userId, questionIndex, selectedOption }) => {
        const game = activeGames.get(gameId);
        
        if (!game || game.currentQuestionIndex !== questionIndex || game.isFinished) return;

        const playerKey = game.player1.id === userId ? 'player1' : (game.player2 && game.player2.id === userId ? 'player2' : null);
        if (!playerKey || game[playerKey].hasAnswered) return;
        
        game[playerKey].hasAnswered = true;
        const question = game.questions[questionIndex];
        if (question.correctAnswer === selectedOption) {
            game[playerKey].score++;
        }
        
        ioInstance.to(gameId).emit('scoreUpdate', {
            player1Score: game.player1.score,
            player2Score: game.player2.score,
        });

        if (game.player1.hasAnswered && game.player2?.hasAnswered) {
            clearInterval(game.questionTimer);
            game.currentQuestionIndex++;
            advanceToNextQuestion(gameId);
        }
    });

    socket.on('surrenderGame', ({ gameId }) => {
        endGame(gameId);
    });
};

module.exports = {
    activeGames,
    initGameLogic: (io) => {
        ioInstance = io;
        return {
            setupSocketEvents: setupSocketEvents,
            startGame: startGame,
            endGame: endGame
        };
    }
};