// src/gameLogic.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { htmlQuestions } = require('./data/htmlQuestions');
const { javascriptQuestions } = require('./data/javascriptQuestions');
const { pythonQuestions } = require('./data/pythonQuestions');
const { cssQuestions } = require('./data/cssQuestions');
const { portuguesConcursos } = require('./data/portuguesConcursos');
const {matematicaConcursos} = require('./data/matematicaConcursos');

const activeGames = new Map(); // Esta é a instância única de activeGames
let ioInstance; // Armazena a instância do Socket.IO server

// --- FUNÇÕES AUXILIARES BÁSICAS (não dependem de ioInstance, nem de outras funções do gameLogic) ---
const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Corrigido 'J' para 'j'
    }
    return shuffledArray;
};

const getQuestionsByCategory = (categoryName) => {
    switch (categoryName) {
        case 'HTML': return htmlQuestions;
        case 'JavaScript': return javascriptQuestions;
        case 'Python': return pythonQuestions;
        case 'CSS': return cssQuestions;
        case 'Portugues': return portuguesConcursos;
        case 'Matematica': return matematicaConcursos;
        default: return htmlQuestions;
    }
};

// --- FUNÇÕES DE GERENCIAMENTO DO MAP activeGames ---
// Estas funções operam diretamente no Map 'activeGames'.
const addGame = (gameId, gameData) => {
    activeGames.set(gameId, gameData);
    console.log(`[gameLogic] Jogo ${gameId} ADICIONADO. ActiveGames keys: ${Array.from(activeGames.keys())}`);
};

const getGame = (gameId) => {
    return activeGames.get(gameId);
};

const removeGame = (gameId) => {
    const wasDeleted = activeGames.delete(gameId);
    if (wasDeleted) {
        console.log(`[gameLogic] Jogo ${gameId} REMOVIDO. ActiveGames keys: ${Array.from(activeGames.keys())}`);
    }
    return wasDeleted;
};

// --- FUNÇÕES PRINCIPAIS DO JOGO (DEFINIDAS EM ORDEM DE DEPENDÊNCIA E COM INJEÇÃO) ---

// 1. endGame é definida primeiro, pois advanceToNextQuestion depende dela.
const endGame = async (gameId, reason = 'finished', { getGame, removeGame }) => {
    console.log(`--> FUNÇÃO endGame INICIADA para o jogo ${gameId}. Razão: ${reason}`);
    const game = getGame(gameId);
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
            console.log(`Backend: Pontuação de ${game.player1.username} (${game.player1.id}) atualizada.`);
        }
        if (game.player2 && game.player2.id !== 'BOT') {
            await prisma.user.update({
                where: { id: game.player2.id },
                data: { score: { increment: game.player2.score } }
            });
            console.log(`Backend: Pontuação de ${game.player2.username} (${game.player2.id}) atualizada.`);
        }
    } catch (error) {
        console.error(`Backend: Erro ao salvar pontuações para os usuários do jogo ${gameId}:`, error);
    }

    // --- Salvar o resultado da partida no banco de dados `Match` ---
    try {
        await prisma.match.create({
            data: {
                id: game.id,
                player1Id: game.player1.id,
                player2Id: game.player2 ? game.player2.id : 'BOT',
                player1Username: game.player1.username,
                player2Username: game.player2 ? game.player2.username : 'BOT',
                category: game.config.category,
                player1Score: game.player1.score,
                player2Score: game.player2 ? game.player2.score : 0,
            },
        });
        console.log(`Backend: Partida ${gameId} salva com sucesso no banco de dados.`);
    } catch (dbError) {
        console.error(`Backend: Erro CRÍTICO ao salvar partida ${gameId} no banco de dados:`, dbError);
    }
    // --- FIM DA LÓGICA DE SALVAMENTO ---

    const winnerId = (game.player1 && game.player2) ? 
                     (game.player1.score > game.player2.score ? game.player1.id :
                     (game.player2.score > game.player1.score ? game.player2.id : null)) :
                     (game.player1 ? game.player1.id : null);

    console.log(`--> EMITINDO 'gameOver' para a sala ${gameId}`);
    ioInstance.to(gameId).emit('gameOver', {
        player1Score: game.player1 ? game.player1.score : 0,
        player2Score: game.player2 ? game.player2.score : 0,
        totalQuestions: game.questions.length,
        category: game.config.category,
        numQuestions: game.config.numQuestions,
        quizTime: game.config.quizTime,
        winnerId: winnerId,
        reason: reason
    });

    removeGame(gameId);
    console.log(`Backend: Partida ${gameId} finalizada e removida de activeGames.`);
};

// 2. advanceToNextQuestion é definida em segundo, pois startGame depende dela.
const advanceToNextQuestion = (gameId, { getGame, endGame, removeGame }) => { // Adicionado removeGame aqui
    const game = getGame(gameId);
    if (!game || game.isFinished) return;

    if (game.questionTimer) {
        clearInterval(game.questionTimer);
    }

    if (game.currentQuestionIndex >= game.questions.length) {
        console.log(`--> CONDIÇÃO DE FIM DE JOGO ATINGIDA (pergunta ${game.currentQuestionIndex}/${game.questions.length}). CHAMANDO endGame...`);
        endGame(gameId, 'finished', { getGame, removeGame }); // Passa as dependências para endGame
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
            advanceToNextQuestion(gameId, { getGame, endGame, removeGame }); // Passa as dependências para a próxima chamada
        }
    }, 1000);
};

// 3. startGame é definida em terceiro.
const startGame = (gameId, { getGame, advanceToNextQuestion, endGame, removeGame }) => { // Adicionado removeGame aqui
    const game = getGame(gameId);
    if (!game) {
        console.error(`[gameLogic] Erro: Jogo ${gameId} não encontrado para iniciar startGame.`);
        return;
    }

    const allQuestions = getQuestionsByCategory(game.config.category);
    game.questions = shuffleArray(allQuestions).slice(0, game.config.numQuestions);

    if (game.questions.length === 0) {
        ioInstance.to(gameId).emit('error', { message: 'Nenhuma pergunta encontrada para esta categoria.' });
        removeGame(gameId); // removeGame é passado
        return;
    }

    console.log(`Backend: Jogo ${gameId} iniciado com ${game.questions.length} perguntas.`);
    
    game.currentQuestionIndex = 0;
    // Passa as funções auxiliares necessárias
    advanceToNextQuestion(gameId, { getGame, endGame, removeGame }); // Passa removeGame
};


// 4. setupSocketEvents é definida por último.
const setupSocketEvents = (socket, { getGame, endGame, advanceToNextQuestion, removeGame }) => { // Adicionado advanceToNextQuestion e removeGame
    socket.on('submitAnswer', ({ gameId, userId, questionIndex, selectedOption }) => {
        const game = getGame(gameId);
        
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
            player2Score: game.player2?.score,
        });

        if (game.player1.hasAnswered && game.player2?.hasAnswered) {
            clearInterval(game.questionTimer);
            game.currentQuestionIndex++;
            advanceToNextQuestion(gameId, { getGame, endGame, removeGame }); // Passa as dependências
        }
    });

    socket.on('surrenderGame', ({ gameId }) => {
        endGame(gameId, 'surrender', { getGame, removeGame }); // Passa o motivo e as funções
    });
};


// --- EXPORTAÇÕES DO MÓDULO ---
module.exports = {
    initGameLogic: (io) => {
        ioInstance = io; // Armazena a instância de io globalmente para uso das funções
        const gameLogicFunctions = { // Objeto que contém todas as funções a serem exportadas
            setupSocketEvents: (socket) => setupSocketEvents(socket, gameLogicFunctions),
            startGame: (gameId) => startGame(gameId, gameLogicFunctions),
            endGame: (gameId, reason) => endGame(gameId, reason, gameLogicFunctions),
            
            addGame: addGame,
            getGame: getGame,
            removeGame: removeGame,
            getActiveGames: () => activeGames,
            // As funções principais também precisam ser referenciadas aqui para injeção recursiva
            // embora já estejam sendo passadas explicitamente acima.
            // Isso garante que advanceToNextQuestion e startGame estejam no objeto gameLogicFunctions
            // para que possam ser passadas para si mesmas e umas às outras.
            advanceToNextQuestion: (gameId, dependencies) => advanceToNextQuestion(gameId, dependencies || gameLogicFunctions), // Self-reference for recursive calls
            
        };
        return gameLogicFunctions; // Retorna o objeto completo
    }
};