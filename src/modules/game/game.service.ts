import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { Game, Player, GameConfig } from './game.types';
import { getQuestionsByCategory } from './data';
import { shuffleArray } from '../../shared/utils';

const prisma = new PrismaClient();

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

class GameService {
  private activeGames = new Map<string, Game>();
  private disconnectTimers = new Map<string, NodeJS.Timeout>(); // gameId -> Timeout
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    console.log('[GameService] Initialized');
  }

  public isUserInActiveGame(userId: string): boolean {
    for (const game of this.activeGames.values()) {
      if (!game.isFinished && game.players.some(p => p.id === userId)) {
        return true;
      }
    }
    return false;
  }

  public createGame(player1: Player, player2: Player, config: GameConfig): Game {
    const gameId = uuidv4();
    const questions = getQuestionsByCategory(config.category);
    const shuffledQuestions = shuffleArray(questions).slice(0, config.numQuestions);

    // Set readiness to false for real players, true for bots
    player1.isReady = player1.isBot;
    player2.isReady = player2.isBot;

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

    console.log(`[GameService] Game ${gameId} created for ${player1.username} and ${player2.username}. Waiting for players to be ready.`);
    this.io.to(gameId).emit('gameStarted', { gameId: game.id, config: game.config, players: game.players });

    // DO NOT start the game immediately. Wait for playerReady event.
    return game;
  }

  public playerReady(gameId: string, userId: string) {
    const game = this.activeGames.get(gameId);
    if (!game) return;

    const player = game.players.find(p => p.id === userId);
    if (!player) return;

    player.isReady = true;
    console.log(`[GameService] Player ${player.username} is ready for game ${gameId}.`);

    const allPlayersReady = game.players.every(p => p.isReady);

    if (allPlayersReady) {
      console.log(`[GameService] All players are ready. Starting game ${gameId}.`);
      this.startGame(gameId);
    }
  }

  public createBotGame(player1: Player, config: GameConfig): Game {
    const botPlayer: Player = {
      id: 'bot-' + uuidv4(),
      username: 'QuizBot 🤖',
      socketId: '',
      score: 0,
      hasAnswered: false,
      isBot: true,
      isReady: true, // Bots are always ready
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

    game.players.forEach(p => p.hasAnswered = false);

    this.io.to(gameId).emit('nextQuestion', {
      question,
      questionIndex,
      totalQuestions: game.questions.length,
    });

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
    if (this.disconnectTimers.has(gameId)) {
        clearTimeout(this.disconnectTimers.get(gameId));
        this.disconnectTimers.delete(gameId);
    }

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

    const responseTime = 2000 + Math.random() * 3000;

    setTimeout(() => {
      const currentGame = this.activeGames.get(game.id);
      if (currentGame && !bot.hasAnswered) {
        this.submitAnswer(game.id, bot.id, answer);
      }
    }, responseTime);
  }

  public handlePlayerDisconnect(socket: AuthenticatedSocket) {
    const userId = socket.user?.userId;
    if (!userId) return;

    let gameId: string | undefined;
    let disconnectedPlayer: Player | undefined;

    for (const [id, game] of this.activeGames.entries()) {
        const player = game.players.find(p => p.id === userId);
        if (player && !game.isFinished) {
            gameId = id;
            disconnectedPlayer = player;
            break;
        }
    }

    if (!gameId || !disconnectedPlayer) return;

    const game = this.activeGames.get(gameId);
    if (!game) return;

    // Notify other players
    this.io.to(gameId).emit('player:disconnected', { userId, username: disconnectedPlayer.username });
    console.log(`[GameService] Player ${disconnectedPlayer.username} disconnected from game ${gameId}. Starting grace period.`);

    const timer = setTimeout(() => {
        console.log(`[GameService] Grace period ended for player ${userId} in game ${gameId}. Ending game.`);
        this.endGame(gameId, `disconnect_${userId}`);
        this.disconnectTimers.delete(gameId);
    }, 15000); // 15 seconds grace period

    this.disconnectTimers.set(gameId, timer);
  }

  public handlePlayerReconnect(userId: string, newSocketId: string) {
    let gameId: string | undefined;

    for (const [id, game] of this.activeGames.entries()) {
        if (game.players.some(p => p.id === userId) && !game.isFinished) {
            gameId = id;
            break;
        }
    }

    if (!gameId) return;

    const game = this.activeGames.get(gameId);
    const player = game?.players.find(p => p.id === userId);

    if (game && player && this.disconnectTimers.has(gameId)) {
        console.log(`[GameService] Player ${player.username} reconnected to game ${gameId}.`);
        clearTimeout(this.disconnectTimers.get(gameId));
        this.disconnectTimers.delete(gameId);

        player.socketId = newSocketId;
        const socket = this.io.sockets.sockets.get(newSocketId);
        socket?.join(gameId);

        this.io.to(gameId).emit('player:reconnected', { userId, username: player.username });
    }
  }
}

export default GameService;
