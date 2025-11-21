import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../shared/errors';
import { Game, Player, GameConfig } from './game.types';
import { getQuestionsByCategory } from './data';
import { shuffleArray } from '../../shared/utils'; // I will create this file

const prisma = new PrismaClient();

class GameService {
  private activeGames = new Map<string, Game>();
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    console.log('[GameService] Initialized');
  }

  public createGame(player1: Player, player2: Player, config: GameConfig): Game {
    const gameId = uuidv4();
    const questions = getQuestionsByCategory(config.category);
    const shuffledQuestions = shuffleArray(questions).slice(0, config.numQuestions);

    const game: Game = {
      id: gameId,
      config,
      players: [player1, player2],
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      questionTimer: null,
      isFinished: false,
    };

    this.activeGames.set(gameId, game);
    
    // Both players join the socket room
    this.io.sockets.sockets.get(player1.socketId)?.join(gameId);
    this.io.sockets.sockets.get(player2.socketId)?.join(gameId);

    console.log(`[GameService] Game ${gameId} created for ${player1.username} and ${player2.username}.`);
    this.io.to(gameId).emit('gameStarted', { gameId: game.id, config: game.config, players: game.players });
    
    this.startGame(gameId);
    return game;
  }

  public createBotGame(player1: Player, config: GameConfig): Game {
    const botPlayer: Player = {
      id: 'bot-' + uuidv4(),
      username: 'QuizBot 🤖',
      socketId: '',
      score: 0,
      hasAnswered: false,
      isBot: true,
      isReady: true,
    };
    
    return this.createGame(player1, botPlayer, config);
  }

  private startGame(gameId: string) {
    const game = this.activeGames.get(gameId);
    if (!game) return;

    if (game.questions.length === 0) {
      this.io.to(gameId).emit('error', { message: 'Nenhuma pergunta encontrada para esta categoria.' });
      this.activeGames.delete(gameId);
      return;
    }

    console.log(`[GameService] Starting game ${gameId}.`);
    game.currentQuestionIndex = 0;
    this.advanceToNextQuestion(gameId);
  }

  private advanceToNextQuestion(gameId: string) {
    const game = this.activeGames.get(gameId);
    if (!game || game.isFinished) return;

    if (game.questionTimer) clearInterval(game.questionTimer);

    if (game.currentQuestionIndex >= game.questions.length) {
      this.endGame(gameId, 'finished');
      return;
    }

    const questionIndex = game.currentQuestionIndex;
    const question = game.questions[questionIndex];

    // Reset answer status for players
    game.players.forEach(p => p.hasAnswered = false);

    this.io.to(gameId).emit('nextQuestion', {
      question,
      questionIndex,
      totalQuestions: game.questions.length,
    });

    // If one of the players is a bot, make it respond
    const bot = game.players.find(p => p.isBot);
    if (bot) {
      this.botRespond(game);
    }
    
    let timeLeft = game.config.quizTime;
    this.io.to(gameId).emit('timerUpdate', timeLeft);

    game.questionTimer = setInterval(() => {
      timeLeft--;
      this.io.to(gameId).emit('timerUpdate', timeLeft);
      if (timeLeft <= 0) {
        if (game.questionTimer) clearInterval(game.questionTimer);
        game.currentQuestionIndex++;
        this.advanceToNextQuestion(gameId);
      }
    }, 1000);
  }

  public submitAnswer(gameId: string, userId: string, selectedOption: string) {
    const game = this.activeGames.get(gameId);
    if (!game || game.isFinished) return;

    const player = game.players.find(p => p.id === userId);
    if (!player || player.hasAnswered) return;

    player.hasAnswered = true;
    const question = game.questions[game.currentQuestionIndex];

    if (question.correctAnswer === selectedOption) {
      player.score++;
    }

    this.io.to(gameId).emit('scoreUpdate', {
      scores: game.players.map(p => ({ userId: p.id, score: p.score })),
    });

    const allAnswered = game.players.every(p => p.hasAnswered);
    if (allAnswered) {
      if (game.questionTimer) clearInterval(game.questionTimer);
      game.currentQuestionIndex++;
      this.advanceToNextQuestion(gameId);
    }
  }

  public surrenderGame(gameId: string, userId: string) {
    const game = this.activeGames.get(gameId);
    if (!game || game.isFinished) return;
    this.endGame(gameId, `surrender_${userId}`);
  }

  private async endGame(gameId: string, reason: string) {
    const game = this.activeGames.get(gameId);
    if (!game || game.isFinished) return;

    console.log(`[GameService] Ending game ${gameId}. Reason: ${reason}`);
    game.isFinished = true;
    if (game.questionTimer) clearInterval(game.questionTimer);

    // Persist scores and match data
    try {
      for (const player of game.players) {
        if (!player.isBot) {
          await prisma.user.update({
            where: { id: player.id },
            data: { score: { increment: player.score } },
          });
        }
      }

      const p1 = game.players[0];
      const p2 = game.players[1];
      await prisma.match.create({
        data: {
          id: game.id,
          player1Id: p1.id,
          player2Id: p2.id,
          player1Username: p1.username,
          player2Username: p2.username,
          category: game.config.category,
          player1Score: p1.score,
          player2Score: p2.score,
        },
      });
    } catch (error) {
      console.error(`[GameService] Error saving match data for game ${gameId}:`, error);
    }

    const winner = game.players[0].score > game.players[1].score ? game.players[0] : (game.players[1].score > game.players[0].score ? game.players[1] : null);

    this.io.to(gameId).emit('gameOver', {
      gameId: game.id,
      finalScores: game.players.map(p => ({ userId: p.id, score: p.score })),
      winnerId: winner ? winner.id : null,
      reason,
    });

    this.activeGames.delete(gameId);
    console.log(`[GameService] Game ${gameId} removed from active games.`);
  }

  private botRespond(game: Game) {
    const bot = game.players.find(p => p.isBot);
    if (!bot) return;

    const question = game.questions[game.currentQuestionIndex];
    const chanceToHit = 0.8;
    const shouldHit = Math.random() < chanceToHit;
    
    let answer: string;
    if (shouldHit) {
      answer = question.correctAnswer;
    } else {
      const wrongOptions = question.alternativas.filter(opt => opt !== question.correctAnswer);
      answer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    }

    const responseTime = 2000 + Math.random() * 3000; // 2-5 seconds

    setTimeout(() => {
      // Check if game still exists and bot hasn't answered yet
      const currentGame = this.activeGames.get(game.id);
      if (currentGame && !bot.hasAnswered) {
        this.submitAnswer(game.id, bot.id, answer);
      }
    }, responseTime);
  }
}

export default GameService;
