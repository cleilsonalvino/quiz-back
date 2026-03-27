const prisma = require("../prisma/prismaClient");

const { htmlQuestions } = require("./data/htmlQuestions");
const { javascriptQuestions } = require("./data/javascriptQuestions");
const { pythonQuestions } = require("./data/pythonQuestions");
const { cssQuestions } = require("./data/cssQuestions");
const { portuguesConcursos } = require("./data/portuguesConcursos");
const { matematicaConcursos } = require("./data/matematicaConcursos");
const { logicaProgramacao } = require("./data/logicaQuestions");
const { bancoDeDadosQuestions } = require("./data/bancoDeDadosQuestions");
const { questionsST } = require("./data/strangersThingsQuestions");
const { inglesQuestions } = require("./data/inglesQuestions");
const { questoesChaves } = require("./data/chavesQuestions");
const { questoesEspanhol } = require("./data/espanholQuestio");

// Importa a lógica do bot para simular a resposta
const { simularRespostaDoBot } = require("./botGame");

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
    case "HTML": return htmlQuestions;
    case "JavaScript": return javascriptQuestions;
    case "Python": return pythonQuestions;
    case "CSS": return cssQuestions;
    case "Portugues": return portuguesConcursos;
    case "Matematica": return matematicaConcursos;
    case "Logica": return logicaProgramacao;
    case "Banco de Dados": return bancoDeDadosQuestions;
    case "Stranger Things": return questionsST;
    case "Inglês": return inglesQuestions;
    case "Chaves": return questoesChaves;
    case "Espanhol": return questoesEspanhol;
    default: return htmlQuestions;
  }
};

const addGame = (gameId, gameData) => {
  activeGames.set(gameId, gameData);
  console.log(`[gameLogic] Jogo ${gameId} ADICIONADO.`);
};

const getGame = (gameId) => {
  return activeGames.get(gameId);
};

const removeGame = (gameId) => {
  const wasDeleted = activeGames.delete(gameId);
  return wasDeleted;
};

const endGame = async (gameId, reason = "finished", { getGame, removeGame }) => {
  console.log(`--> FUNÇÃO endGame INICIADA para o jogo ${gameId}. Razão: ${reason}`);
  const game = getGame(gameId);
  if (!game || game.isFinished) return;

  game.isFinished = true;
  if (game.questionTimer) clearInterval(game.questionTimer);

  const p1Score = game.player1 ? game.player1.score : 0;
  const p2Score = game.player2 ? game.player2.score : 0;
  
  try {
    if (game.player1) {
      await prisma.user.update({
        where: { id: game.player1.id },
        data: { score: { increment: p1Score } },
      });
    }
    if (game.player2 && !game.player2.isBot) {
      await prisma.user.update({
        where: { id: game.player2.id },
        data: { score: { increment: p2Score } }, // Incremento corrigido para o player2 também (boa prática)
      });
    }
  } catch (error) {
    console.error(`Backend: Erro ao salvar pontuações:`, error);
  }

  const finalScoresForDB = [
    { userId: game.player1.id, score: p1Score },
    { userId: game.player2 ? game.player2.id : "BOT", score: p2Score },
  ];

  try {
    await prisma.match.create({
      data: {
        id: game.id,
        player1Id: game.player1.id,
        player2Id: game.player2 ? game.player2.id : "BOT",
        player1Username: game.player1.username,
        player2Username: game.player2 ? game.player2.username : "BOT",
        category: game.config.category,
        player1Score: p1Score,
        player2Score: p2Score,
      },
    });
  } catch (dbError) {
    console.error(`Backend: Erro CRÍTICO ao salvar partida:`, dbError);
  }

  const winnerId = game.player1 && game.player2
      ? p1Score > p2Score ? game.player1.id : p2Score > p1Score ? game.player2.id : null
      : game.player1 ? game.player1.id : null;

  ioInstance.to(gameId).emit("gameOver", {
    gameId: game.id,
    finalScores: finalScoresForDB,
    winnerId: winnerId,
    totalQuestions: game.questions.length,
    category: game.config.category,
    numQuestions: game.config.numQuestions,
    quizTime: game.config.quizTime,
    reason: reason,
  });

  removeGame(gameId);
};

// --- FUNÇÃO CENTRAL DE RESPOSTA (HUMANO E BOT USAM ESTA) ---
const processSubmitAnswer = (data, ioInstance, gameLogicFunctions) => {
  const { gameId, userId, questionIndex, selectedOption } = data;
  const { getGame, endGame, removeGame, advanceToNextQuestion } = gameLogicFunctions;

  const game = getGame(gameId);
  if (!game || game.currentQuestionIndex !== questionIndex || game.isFinished) return;

  const playerKey = game.player1.id === userId ? "player1" : (game.player2 && game.player2.id === userId ? "player2" : null);
  if (!playerKey || game[playerKey].hasAnswered) return;

  game[playerKey].hasAnswered = true;
  const question = game.questions[questionIndex];

  // Verifica se acertou
  const isCorrect = question.correctAnswer === selectedOption;
  if (isCorrect) {
    game[playerKey].score++;
  }

  // Avisa a todos na sala quem respondeu e se acertou (Para o ✓ e ✗ visual)
  ioInstance.to(gameId).emit("playerAnswered", {
    userId: userId,
    isCorrect: isCorrect,
  });

  ioInstance.to(gameId).emit("scoreUpdate", {
    player1Score: game.player1.score,
    player2Score: game.player2?.score,
  });

  if (game.player1.hasAnswered && game.player2?.hasAnswered) {
    clearInterval(game.questionTimer);
    game.currentQuestionIndex++;
    advanceToNextQuestion(gameId, { getGame, endGame, removeGame }, ioInstance);
  }
};


const advanceToNextQuestion = (gameId, { getGame, endGame, removeGame }) => {
  const game = getGame(gameId);
  if (!game || game.isFinished) return;

  if (game.questionTimer) clearInterval(game.questionTimer);

  if (game.currentQuestionIndex >= game.questions.length) {
    endGame(gameId, "finished", { getGame, removeGame });
    return;
  }

  const questionIndex = game.currentQuestionIndex;
  const question = game.questions[questionIndex];

  if (game.player1) game.player1.hasAnswered = false;
  if (game.player2) game.player2.hasAnswered = false;

  ioInstance.to(gameId).emit("nextQuestion", {
    question,
    questionIndex,
    totalQuestions: game.questions.length,
  });

  let timeLeft = game.config.quizTime;
  ioInstance.to(gameId).emit("timerUpdate", timeLeft);

  game.questionTimer = setInterval(() => {
    timeLeft--;
    ioInstance.to(gameId).emit("timerUpdate", timeLeft);

    if (timeLeft <= 0) {
      clearInterval(game.questionTimer);
      game.currentQuestionIndex++;
      advanceToNextQuestion(gameId, { getGame, endGame, removeGame });
    }
  }, 1000);

  // --- O BOT COMEÇA A PENSAR ASSIM QUE A PERGUNTA APARECE ---
  if (game.player2 && game.player2.isBot) {
    // Para funcionar, gameLogicFunctions deve ser acessível aqui (o exports no fim do arquivo resolve isso)
    const gameLogicFns = { getGame, endGame, removeGame, advanceToNextQuestion, processSubmitAnswer };
    simularRespostaDoBot(gameId, questionIndex, gameLogicFns, ioInstance);
  }
};


const startGame = (gameId, { getGame, advanceToNextQuestion, endGame, removeGame }) => {
  const game = getGame(gameId);
  if (!game) return;

  const allQuestions = getQuestionsByCategory(game.config.category);
  game.questions = shuffleArray(allQuestions).slice(0, game.config.numQuestions);

  if (game.questions.length === 0) {
    ioInstance.to(gameId).emit("error", { message: "Nenhuma pergunta encontrada para esta categoria." });
    removeGame(gameId);
    return;
  }

  game.currentQuestionIndex = 0;
  advanceToNextQuestion(gameId, { getGame, endGame, removeGame }); 
};

// 4. setupSocketEvents
const setupSocketEvents = (socket, gameLogicFunctions) => {
  
  socket.on("submitAnswer", (data) => {
     processSubmitAnswer(data, ioInstance, gameLogicFunctions);
  });

  socket.on("surrenderGame", ({ gameId }) => {
    gameLogicFunctions.endGame(gameId, "surrender", gameLogicFunctions); 
  });
};

// --- EXPORTAÇÕES DO MÓDULO ---
module.exports = {
  initGameLogic: (io) => {
    ioInstance = io;
    const gameLogicFunctions = {
      setupSocketEvents: (socket) => setupSocketEvents(socket, gameLogicFunctions),
      startGame: (gameId) => startGame(gameId, gameLogicFunctions),
      endGame: (gameId, reason) => endGame(gameId, reason, gameLogicFunctions),
      addGame: addGame,
      getGame: getGame,
      removeGame: removeGame,
      getActiveGames: () => activeGames,
      advanceToNextQuestion: (gameId, dependencies) => advanceToNextQuestion(gameId, dependencies || gameLogicFunctions), 
      getQuestionsByCategory: getQuestionsByCategory,
      processSubmitAnswer: processSubmitAnswer // <-- Bot precisa disso
    };
    return gameLogicFunctions; 
  },
};