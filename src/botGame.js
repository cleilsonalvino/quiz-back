const { v4: uuidv4 } = require("uuid");

function criarBotHandler(gameLogicFunctions, io) {
  return function adicionarBotNaPartida(game, categoryQueue) {
    if (game.player2) {
      console.log(`[BOT_HANDLER] Partida ${game.id} já tem player2. Bot não adicionado.`);
      return;
    }

    console.log(`[BOT_HANDLER] Adicionando bot à partida ${game.id}...`);

    const botPlayer = {
      id: "bot-" + uuidv4(),
      username: "QuizBot 🤖",
      socketId: null,
      score: 0,
      isReady: true,
      hasAnswered: false,
      isBot: true,
      accuracy: 0.4 // 40% de chance de acertar
    };

    game.player2 = botPlayer;

    if (categoryQueue) {
      categoryQueue.delete(game.id);
      console.log(`[BOT_HANDLER] Jogo ${game.id} removido da fila de categoria.`);
    }

    // Pega as perguntas e corta para o tamanho certo
    const questions = gameLogicFunctions.getQuestionsByCategory?.(game.config.category) || [];
    game.questions = questions.slice(0, game.config.numQuestions);
    
    // Atualiza a partida principal
    gameLogicFunctions.addGame(game.id, game);

    // Avisa o Player 1
    const playerSocketId = game.player1?.socketId;
    if (playerSocketId) {
      io.to(playerSocketId).emit("quickMatch:opponent_found", {
        message: "Um QuizBot entrou na partida! Iniciando...",
        opponent: { id: botPlayer.id, username: botPlayer.username, isBot: true }
      });
      io.to(playerSocketId).emit('gameStarted', {
        gameId: game.id,
        config: game.config,
        player1: game.player1,
        player2: game.player2,
      });
    }

    // Inicia o jogo!
    gameLogicFunctions.startGame(game.id);
  };
}

// O Bot usa esta função para "clicar" na resposta
function simularRespostaDoBot(gameId, questionIndex, gameLogicFunctions, ioInstance) {
  const game = gameLogicFunctions.getGame(gameId);
  if (!game || !game.player2?.isBot || game.isFinished) return;

  // Tempo de "pensamento" (2 a 5 segundos)
  const tempoDeResposta = Math.floor(Math.random() * 3000) + 2000;

  setTimeout(() => {
    const currentGame = gameLogicFunctions.getGame(gameId);
    if (!currentGame || currentGame.currentQuestionIndex !== questionIndex || currentGame.player2.hasAnswered) return;

    const question = currentGame.questions[questionIndex];
    
    // O bot decide se vai acertar
    const vaiAcertar = Math.random() < currentGame.player2.accuracy;
    
    let opcaoEscolhida;
    if (vaiAcertar) {
      opcaoEscolhida = question.correctAnswer;
    } else {
      const alternativasErradas = question.alternativas.filter(opt => opt !== question.correctAnswer);
      opcaoEscolhida = alternativasErradas[Math.floor(Math.random() * alternativasErradas.length)];
    }

    // O bot envia sua escolha para a mesma função que processa a resposta do humano!
    if (gameLogicFunctions.processSubmitAnswer) {
      gameLogicFunctions.processSubmitAnswer(
        {
          gameId: gameId,
          userId: currentGame.player2.id,
          questionIndex: questionIndex,
          selectedOption: opcaoEscolhida
        },
        ioInstance,
        gameLogicFunctions
      );
    } else {
       console.error("[BOT_HANDLER] processSubmitAnswer não encontrada em gameLogicFunctions.");
    }

  }, tempoDeResposta);
}

module.exports = { criarBotHandler, simularRespostaDoBot };