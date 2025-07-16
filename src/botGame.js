// botGame.js
const { v4: uuidv4 } = require("uuid"); // Garanta que uuidv4 está disponível aqui também

function criarBotHandler(gameLogicFunctions, io) {
  return function adicionarBotNaPartida(game, categoryQueue) {
    // Se o player2 já existe (um humano entrou antes do timeout), não faça nada.
    if (game.player2) {
      console.log(`[BOT_HANDLER] Partida ${game.id} já tem player2. Bot não adicionado.`);
      return;
    }

    console.log(`[BOT_HANDLER] Adicionando bot à partida ${game.id}...`);

    const botPlayer = {
      id: "bot-" + uuidv4(), // ID único para o bot
      username: "QuizBot 🤖", // Nome do bot
      socketId: null, // Bots não têm socketId real
      score: 0,
      isReady: true, // Bots estão sempre prontos para jogar
      hasAnswered: false,
      isBot: true, // Propriedade para identificar que é um bot
    };

    game.player2 = botPlayer;

    // É crucial remover o jogo da fila `pendingGamesByCategory`
    // para que ele não apareça mais na lista pública e não seja mais 'joinable' por humanos.
    // O `categoryQueue` é o Map específico para a categoria do jogo.
    if (categoryQueue) {
      categoryQueue.delete(game.id);
      console.log(`[BOT_HANDLER] Jogo ${game.id} removido da fila de categoria.`);
    } else {
      console.warn(`[BOT_HANDLER] categoryQueue não fornecido ou inválido para o jogo ${game.id}. Não foi possível remover da fila.`);
    }

    // Carregar as perguntas para o jogo com o bot
    // Certifique-se de que gameLogicFunctions.getQuestionsByCategory está implementado
    const questions = gameLogicFunctions.getQuestionsByCategory?.(game.config.category) || [];
    game.questions = questions.slice(0, game.config.numQuestions);
    console.log(`[BOT_HANDLER] ${game.questions.length} perguntas carregadas para o jogo ${game.id}.`);

    // Atualiza o jogo no armazenamento principal (activeGames)
    gameLogicFunctions.addGame(game.id, game);
    console.log(`[BOT_HANDLER] Jogo ${game.id} atualizado em activeGames com o bot.`);

    const playerSocketId = game.player1?.socketId;
    if (playerSocketId) {
      io.to(playerSocketId).emit("quickMatch:opponent_found", {
        message: "Um QuizBot entrou na partida! Iniciando...",
        opponent: { id: botPlayer.id, username: botPlayer.username, isBot: true } // Envia dados do bot para o frontend
      });
      console.log(`[BOT_HANDLER] Evento 'quickMatch:opponent_found' emitido para o player1 (${game.player1.username}).`);
    } else {
      console.warn(`[BOT_HANDLER] Socket ID do Player1 não encontrado para a partida ${game.id}.`);
    }

    // Inicia o jogo!
    console.log(`[BOT_HANDLER] Chamando gameLogicFunctions.startGame para o jogo ${game.id}.`);
    gameLogicFunctions.startGame(game.id);
  };
}

module.exports = { criarBotHandler };