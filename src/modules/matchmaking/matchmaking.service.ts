import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import GameService from '../game/game.service';
import { Player, GameConfig } from '../game/game.types';
import { QueuedPlayer, PendingGame } from './matchmaking.types';
import { FindMatchDTO } from './matchmaking.dto';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

// A simplified representation of a challenge
interface PendingChallenge {
  challengerId: string;
  opponentId: string;
  gameId: string;
  config: GameConfig;
  timeout: NodeJS.Timeout;
}

class MatchmakingService {
  private onlineUsers = new Map<string, QueuedPlayer>();
  private pendingGames = new Map<string, PendingGame>(); // gameId -> PendingGame
  private pendingChallenges = new Map<string, PendingChallenge>(); // gameId -> Challenge
  private disconnectTimers = new Map<string, NodeJS.Timeout>(); // userId -> Timeout

  public getOnlineUsers() {
    return this.onlineUsers;
  }

  constructor(private gameService: GameService, private io: Server) {
    console.log('[MatchmakingService] Initialized');
  }

  // --- Connection and Disconnection ---

  public handleNewConnection(socket: AuthenticatedSocket) {
    const userId = socket.user?.userId;
    const username = socket.user?.username;

    if (!userId || !username) {
      socket.disconnect(true);
      return;
    }

    // Handle user connecting from a new device
    const existingUser = this.onlineUsers.get(userId);
    if (existingUser && existingUser.socketId !== socket.id) {
      this.io.to(existingUser.socketId).emit('user:disconnected_by_new_login');
      this.io.sockets.sockets.get(existingUser.socketId)?.disconnect(true);
    }

    this.onlineUsers.set(userId, { id: userId, username, socketId: socket.id });
    console.log(`[Matchmaking] User connected: ${username} (${userId}). Total online: ${this.onlineUsers.size}`);
    
    // TODO: Add logic for reconnecting to an existing game
  }

  public handleDisconnect(socket: AuthenticatedSocket) {
    const userId = socket.user?.userId;
    if (!userId) return;

    const userData = this.onlineUsers.get(userId);
    // Only remove if the disconnected socket is the last known socket for that user
    if (userData && userData.socketId === socket.id) {
      this.onlineUsers.delete(userId);
      console.log(`[Matchmaking] User disconnected: ${userData.username} (${userId}). Total online: ${this.onlineUsers.size}`);
      this.cleanupUser(userId);
    }
  }

  private cleanupUser(userId: string) {
    // Remove from any pending games
    this.pendingGames.forEach((game, gameId) => {
      if (game.player1.id === userId) {
        clearTimeout(game.botTimeout);
        this.pendingGames.delete(gameId);
        console.log(`[Matchmaking] Removed pending game ${gameId} created by disconnected user ${userId}.`);
      }
    });

    // Remove from any pending challenges
    this.pendingChallenges.forEach((challenge, gameId) => {
      if (challenge.challengerId === userId || challenge.opponentId === userId) {
        clearTimeout(challenge.timeout);
        this.pendingChallenges.delete(gameId);
        const otherPlayerId = challenge.challengerId === userId ? challenge.opponentId : challenge.challengerId;
        const otherPlayer = this.onlineUsers.get(otherPlayerId);
        if (otherPlayer) {
          this.io.to(otherPlayer.socketId).emit('challenge:canceled', { message: 'O oponente se desconectou.' });
        }
        console.log(`[Matchmaking] Removed pending challenge ${gameId} involving disconnected user ${userId}.`);
      }
    });
  }

  // --- Public Matchmaking ---

  public findPublicMatch(socket: AuthenticatedSocket, data: FindMatchDTO) {
    const userId = socket.user?.userId;
    const username = socket.user?.username;
    if (!userId || !username) return;

    if (this.isUserBusy(userId)) {
      socket.emit('matchmaking:error', { message: 'Você já está em uma partida ou fila.' });
      return;
    }
    
    const config: GameConfig = { category: data.category, numQuestions: data.numQuestions, quizTime: data.quizTime };

    // Try to find a waiting player
    for (const [gameId, pendingGame] of this.pendingGames.entries()) {
      if (pendingGame.config.category === config.category && 
          pendingGame.config.numQuestions === config.numQuestions &&
          pendingGame.config.quizTime === config.quizTime) {
        
        clearTimeout(pendingGame.botTimeout);
        this.pendingGames.delete(gameId);

        const player1 = pendingGame.player1;
        const player2: Player = { id: userId, username, socketId: socket.id, score: 0, hasAnswered: false, isBot: false, isReady: true };
        
        this.gameService.createGame(player1, player2, config);
        return;
      }
    }

    // No waiting player found, create a new pending game
    const gameId = uuidv4();
    const player1: Player = { id: userId, username, socketId: socket.id, score: 0, hasAnswered: false, isBot: false, isReady: true };

    const botTimeout = setTimeout(() => {
      const game = this.pendingGames.get(gameId);
      if (game) {
        this.pendingGames.delete(gameId);
        this.gameService.createBotGame(game.player1, game.config);
        console.log(`[Matchmaking] Bot added to game ${gameId}.`);
      }
    }, 10000); // 10 seconds to find a bot

    this.pendingGames.set(gameId, { id: gameId, player1, config, botTimeout });
    socket.emit('matchmaking:waiting', { gameId, message: 'Aguardando oponente...' });
    console.log(`[Matchmaking] User ${username} is waiting for a match in category ${config.category}.`);
  }

  public cancelMatchmaking(socket: AuthenticatedSocket, gameId: string) {
    const userId = socket.user?.userId;
    const pendingGame = this.pendingGames.get(gameId);

    if (pendingGame && pendingGame.player1.id === userId) {
      clearTimeout(pendingGame.botTimeout);
      this.pendingGames.delete(gameId);
      socket.emit('matchmaking:canceled');
      console.log(`[Matchmaking] User ${userId} canceled matchmaking for game ${gameId}.`);
    }
  }


  private isUserBusy(userId: string): boolean {
    // Check active games in GameService
    // This is a simplification; GameService would need to expose a way to check this
    // For now, we'll just check our own queues.

    // Check pending games
    for (const game of this.pendingGames.values()) {
      if (game.player1.id === userId) return true;
    }

    // Check pending challenges
    for (const challenge of this.pendingChallenges.values()) {
      if (challenge.challengerId === userId || challenge.opponentId === userId) return true;
    }

    return false;
  }
}

export default MatchmakingService;
