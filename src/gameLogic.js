// src/gameLogic.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { htmlQuestions } = require('./data/htmlQuestions');
const { javascriptQuestions } = require('./data/javascriptQuestions');
const { pythonQuestions } = require('./data/pythonQuestions');
const { cssQuestions } = require('./data/cssQuestions');
const { portuguesConcursos } = require('./data/portuguesConcursos');
const {matematicaConcursos} = require('./data/matematicaConcursos');
const { logicaProgramacao } = require('./data/logicaQuestions');
const { bancoDeDadosQuestions } = require('./data/bancoDeDadosQuestions');
const { questionsST } = require('./data/strangersThingsQuestions');

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
        case 'Logica': return logicaProgramacao;
        case 'Banco de Dados': return bancoDeDadosQuestions;
        case 'Stranger Things': return questionsST;
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

    // Corrigido para garantir que player2 existe antes de tentar acessar score
    const p1Score = game.player1 ? game.player1.score : 0;
    const p2Score = game.player2 ? game.player2.score : 0;
    
    console.log(`Backend: Finalizando jogo ${gameId}. Pontuações: P1=${p1Score}, P2=${p2Score}`);

    try {
        if (game.player1) {
            await prisma.user.update({
                where: { id: game.player1.id },
                data: { score: { increment: p1Score } } // Usar p1Score
            });
            console.log(`Backend: Pontuação de ${game.player1.username} (${game.player1.id}) atualizada.`);
        }
if (game.player2 && !game.player2.isBot) {
  // Atualiza só se não for bot
  await prisma.user.update({
    where: { id: game.player2.id },
    data: {
      score: game.player2.score,
      // outros campos que você quiser atualizar
    },
  });
  console.log(`Backend: Pontuação de ${game.player2.username} (${game.player2.id}) atualizada.`);
}

    } catch (error) {
        console.error(`Backend: Erro ao salvar pontuações para os usuários do jogo ${gameId}:`, error);
    }

    // --- Preparar finalScores para o banco de dados e para o frontend ---
    const finalScoresForDB = [
        { userId: game.player1.id, score: p1Score },
        { userId: game.player2 ? game.player2.id : 'BOT', score: p2Score }
    ];

    // --- Salvar o resultado da partida no banco de dados `Match` ---
    try {
        await prisma.match.create({
            data: {
                id: game.id, // O ID do jogo é o ID da partida
                player1Id: game.player1.id,
                player2Id: game.player2 ? game.player2.id : 'BOT',
                player1Username: game.player1.username,
                player2Username: game.player2 ? game.player2.username : 'BOT',
                category: game.config.category,
                player1Score: p1Score, // Usar p1Score
                player2Score: p2Score, // Usar p2Score
            },
        });
        console.log(`Backend: Partida ${gameId} salva com sucesso no banco de dados.`);
    } catch (dbError) {
        console.error(`Backend: Erro CRÍTICO ao salvar partida ${gameId} no banco de dados:`, dbError);
    }
    // --- FIM DA LÓGICA DE SALVAMENTO ---

    const winnerId = (game.player1 && game.player2) ?
                     (p1Score > p2Score ? game.player1.id :
                     (p2Score > p1Score ? game.player2.id : null)) :
                     (game.player1 ? game.player1.id : null); // Lógica para winnerId, ok como está

    console.log(`--> EMITINDO 'gameOver' para a sala ${gameId}`);
    // --- ESTA É A CORREÇÃO PRINCIPAL ---
    ioInstance.to(gameId).emit('gameOver', {
        gameId: game.id, // <--- ADICIONADO: O ID do jogo deve ser incluído aqui
        finalScores: finalScoresForDB, // <--- ADICIONADO: Array com userId e score para cada jogador
        winnerId: winnerId,
        totalQuestions: game.questions.length, // Já estava aqui, ótimo!
        category: game.config.category,       // Já estava aqui, ótimo!
        numQuestions: game.config.numQuestions, // Já estava aqui, ótimo!
        quizTime: game.config.quizTime,         // Já estava aqui, ótimo!
        reason: reason
    });

    removeGame(gameId);
    console.log(`Backend: Partida ${gameId} finalizada e removida de activeGames.`);
};

function botAnswerLogic(question) {
  // Probabilidade do bot acertar (exemplo 80%)
  const chanceAcertar = 0.8;

  const acertou = Math.random() < chanceAcertar;
  if (acertou) {
    return question.correctAnswer;
  } else {
    // Escolhe uma alternativa errada aleatória
    const alternativasErradas = question.alternativas.filter(
      (alt) => alt !== question.correctAnswer
    );
    return alternativasErradas[
      Math.floor(Math.random() * alternativasErradas.length)
    ];
  }
}

function botRespond(game, questionIndex, ioInstance) {
  const question = game.questions[questionIndex];

  // Tempo aleatório pra responder entre 2 a 5 segundos
  const tempoResposta = 2000 + Math.random() * 3000;

  setTimeout(() => {
    if (game.player2.hasAnswered || game.isFinished) return;

    const respostaDoBot = botAnswerLogic(question);

    game.player2.hasAnswered = true;

    if (respostaDoBot === question.correctAnswer) {
      game.player2.score++;
    }

    ioInstance.to(game.id).emit('submitAnswer', {
      gameId: game.id,
      userId: game.player2.id,
      questionIndex,
      selectedOption: respostaDoBot,
    });

    ioInstance.to(game.id).emit('scoreUpdate', {
      player1Score: game.player1.score,
      player2Score: game.player2.score,
    });

    // Se player1 já respondeu, avança para próxima pergunta
    if (game.player1.hasAnswered) {
      clearInterval(game.questionTimer);
      game.currentQuestionIndex++;
      advanceToNextQuestion(game.id, { getGame, endGame, removeGame });
    }
  }, tempoResposta);
}


// 2. advanceToNextQuestion é definida em segundo, pois startGame depende dela.
const advanceToNextQuestion = (gameId, { getGame, endGame, removeGame }) => {
  const game = getGame(gameId);
  if (!game || game.isFinished) return;

  if (game.questionTimer) clearInterval(game.questionTimer);

  if (game.currentQuestionIndex >= game.questions.length) {
    endGame(gameId, 'finished', { getGame, removeGame });
    return;
  }

  const questionIndex = game.currentQuestionIndex;
  const question = game.questions[questionIndex];

  if (game.player1) game.player1.hasAnswered = false;
  if (game.player2) game.player2.hasAnswered = false;

  ioInstance.to(gameId).emit('nextQuestion', {
    question,
    questionIndex,
    totalQuestions: game.questions.length,
  });

  if (game.player2 && game.player2.isBot) {
  botRespond(game, game.currentQuestionIndex, ioInstance);
}


  let timeLeft = game.config.quizTime;
  ioInstance.to(gameId).emit('timerUpdate', timeLeft);

  game.questionTimer = setInterval(() => {
    timeLeft--;
    ioInstance.to(gameId).emit('timerUpdate', timeLeft);

    if (timeLeft <= 0) {
      clearInterval(game.questionTimer);
      game.currentQuestionIndex++;
      advanceToNextQuestion(gameId, { getGame, endGame, removeGame });
    }
  }, 1000);

if (game.player2 && game.player2.isBot) {
  setTimeout(() => {
    if (!game.player2.hasAnswered && !game.isFinished) {
      const question = game.questions[game.currentQuestionIndex];
      const chosenOption = question.correctAnswer; // ou escolha aleatória

      // O bot envia a resposta para o backend processar
      ioInstance.to(gameId).emit('submitAnswer', {
        gameId,
        userId: game.player2.id,
        questionIndex: game.currentQuestionIndex,
        selectedOption: chosenOption,
      });

      game.player2.hasAnswered = true;
      console.log(`[BOT_HANDLER] Bot respondeu na partida ${gameId} com opção: ${chosenOption}`);
    }
  }, 2000 + Math.random() * 3000); // resposta em 2-5 segundos
}

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
            getQuestionsByCategory: getQuestionsByCategory,
            
        };
        return gameLogicFunctions; // Retorna o objeto completo
    }
};