import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import GameService from '../game/game.service';
import { Player, GameConfig } from '../game/game.types';
import { QueuedPlayer, PendingGame } from './matchmaking.types';
import { FindMatchDTO, ChallengeDTO } from './matchmaking.dto';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

interface PendingChallenge {
  challenger: Player;
  opponentId: string;
  gameId: string;
  config: GameConfig;
  timeout: NodeJS.Timeout;
}

class MatchmakingService {
  private onlineUsers = new Map<string, QueuedPlayer>();
  private pendingGames = new Map<string, PendingGame>(); // gameId -> PendingGame for public lobby
  private pendingChallenges = new Map<string, PendingChallenge>(); // gameId -> Challenge
  private lastEmittedPendingListJson = '[]';

  public getOnlineUsers() {
    return this.onlineUsers;
  }

  constructor(private gameService: GameService, private io: Server) {
    console.log('[MatchmakingService] Initialized');
    // Periodically emit the list of pending games
    setInterval(() => {
      this.emitPendingGamesList();
    }, 2000);
  }

  // --- Connection and Disconnection ---

  public handleNewConnection(socket: AuthenticatedSocket) {
    const userId = socket.user?.userId;
    const username = socket.user?.username;

    if (!userId || !username) {
      socket.disconnect(true);
      return;
    }
    
    const existingUser = this.onlineUsers.get(userId);
    if (existingUser && existingUser.socketId !== socket.id) {
      this.io.to(existingUser.socketId).emit('user:disconnected_by_new_login');
      this.io.sockets.sockets.get(existingUser.socketId)?.disconnect(true);
    }
    
    this.onlineUsers.set(userId, { id: userId, username, socketId: socket.id });
    console.log(`[Matchmaking] User connected: ${username} (${userId}). Total online: ${this.onlineUsers.size}`);
    
    // Handle player reconnection to an active game
    if (this.gameService.isUserInActiveGame(userId)) {
      this.gameService.handlePlayerReconnect(userId, socket.id);
    }
  }

  public handleDisconnect(socket: AuthenticatedSocket) {
    const userId = socket.user?.userId;
    if (!userId) return;

    const userData = this.onlineUsers.get(userId);
    if (userData && userData.socketId === socket.id) {
      this.onlineUsers.delete(userId);
      console.log(`[Matchmaking] User disconnected: ${userData.username} (${userId}). Total online: ${this.onlineUsers.size}`);
      this.cleanupUser(userId);
    }
  }

  private cleanupUser(userId: string) {
    this.pendingGames.forEach((game, gameId) => {
      if (game.player1.id === userId) {
        clearTimeout(game.botTimeout);
        this.pendingGames.delete(gameId);
      }
    });
    this.emitPendingGamesList();

    this.pendingChallenges.forEach((challenge, gameId) => {
      if (challenge.challenger.id === userId || challenge.opponentId === userId) {
        clearTimeout(challenge.timeout);
        this.pendingChallenges.delete(gameId);
        const otherPlayerId = challenge.challenger.id === userId ? challenge.opponentId : challenge.challenger.id;
        const otherPlayer = this.onlineUsers.get(otherPlayerId);
        if (otherPlayer) {
          this.io.to(otherPlayer.socketId).emit('challenge:canceled', { gameId, message: 'O oponente se desconectou.' });
        }
      }
    });
  }

  private emitPendingGamesList() {
    const pendingList = Array.from(this.pendingGames.values()).map(game => ({
      gameId: game.id,
      category: game.config.category,
      player1Username: game.player1.username,
      numQuestions: game.config.numQuestions,
      quizTime: game.config.quizTime,
    }));
    const currentJson = JSON.stringify(pendingList);
    if (currentJson !== this.lastEmittedPendingListJson) {
      this.io.emit('matchmaking:pending_list', pendingList);
      this.lastEmittedPendingListJson = currentJson;
      console.log(`[Matchmaking] Emitted pending games list: ${pendingList.length} games.`);
    }
  }

  // --- Public Matchmaking ---

  public createPublicMatch(socket: AuthenticatedSocket, data: FindMatchDTO) {
    const userId = socket.user?.userId;
    const username = socket.user?.username;
    if (!userId || !username) return;

    if (this.isUserBusy(userId)) {
      socket.emit('matchmaking:error', { message: 'Você já está em uma partida ou fila.' });
      return;
    }
    
    const config: GameConfig = { category: data.category, numQuestions: data.numQuestions, quizTime: data.quizTime };
    const gameId = uuidv4();
    const player1: Player = { id: userId, username, socketId: socket.id, score: 0, hasAnswered: false, isBot: false, isReady: false };

    const botTimeout = setTimeout(() => {
      const game = this.pendingGames.get(gameId);
      if (game) {
        this.pendingGames.delete(gameId);
        this.emitPendingGamesList();
        this.gameService.createBotGame(game.player1, game.config);
        console.log(`[Matchmaking] Bot added to game ${gameId}.`);
      }
    }, 10000);

    this.pendingGames.set(gameId, { id: gameId, player1, config, botTimeout });
    socket.emit('gameCreated', { gameId, message: 'Partida criada! Aguardando oponente...' });
    this.emitPendingGamesList();
    console.log(`[Matchmaking] User ${username} created a public match ${gameId} in category ${config.category}.`);
  }

  public joinPendingGame(socket: AuthenticatedSocket, gameId: string) {
    const userId = socket.user?.userId;
    const username = socket.user?.username;
    if (!userId || !username) return;

    if (this.isUserBusy(userId)) {
        socket.emit('matchmaking:error', { message: 'Você já está em um jogo ou fila de espera.' });
        return;
    }

    const pendingGame = this.pendingGames.get(gameId);
    if (!pendingGame) {
        socket.emit('matchmaking:error', { message: 'Esta partida não está mais disponível.' });
        return;
    }

    clearTimeout(pendingGame.botTimeout);
    this.pendingGames.delete(gameId);
    this.emitPendingGamesList();

    const player1 = pendingGame.player1;
    const player2: Player = { id: userId, username, socketId: socket.id, score: 0, hasAnswered: false, isBot: false, isReady: false };
    
    this.gameService.createGame(player1, player2, pendingGame.config);
  }

  public cancelMatchmaking(socket: AuthenticatedSocket, gameId: string) {
    const userId = socket.user?.userId;
    const pendingGame = this.pendingGames.get(gameId);

    if (pendingGame && pendingGame.player1.id === userId) {
      clearTimeout(pendingGame.botTimeout);
      this.pendingGames.delete(gameId);
      this.emitPendingGamesList();
      socket.emit('matchmaking:canceled');
      console.log(`[Matchmaking] User ${userId} canceled matchmaking for game ${gameId}.`);
    }
  }

  // --- Private Challenges ---

  public createChallenge(socket: AuthenticatedSocket, data: ChallengeDTO) {
    const challengerId = socket.user?.userId;
    const challengerUsername = socket.user?.username;
    if (!challengerId || !challengerUsername) return;
    
    const { opponentId, ...config } = data;
    const opponent = this.onlineUsers.get(opponentId);

    if (!opponent) {
      socket.emit('challenge:response', { type: 'error', message: 'Oponente não está online.' });
      return;
    }
    if (this.isUserBusy(challengerId) || this.isUserBusy(opponentId)) {
      socket.emit('challenge:response', { type: 'declined', message: 'Você ou seu oponente já estão em uma partida.' });
      return;
    }

    const gameId = uuidv4();
    const challenger: Player = { id: challengerId, username: challengerUsername, socketId: socket.id, score: 0, hasAnswered: false, isBot: false, isReady: false };
    
    const timeout = setTimeout(() => {
      this.pendingChallenges.delete(gameId);
      socket.emit('challenge:response', { type: 'expired', gameId, message: 'O desafio expirou.' });
      this.io.to(opponent.socketId).emit('challenge:canceled', { gameId, message: 'O desafio expirou.' });
    }, 30000);

    this.pendingChallenges.set(gameId, { challenger, opponentId, gameId, config, timeout });

    this.io.to(opponent.socketId).emit('challenge:received', {
      challengerId,
      challengerName: challengerUsername,
      gameId,
      ...config,
    });
    socket.emit('challenge:created', { gameId, message: `Desafio enviado para ${opponent.username}.` });
  }

  public acceptChallenge(socket: AuthenticatedSocket, gameId: string) {
    const opponentId = socket.user?.userId;
    if (!opponentId) return;

    const challenge = this.pendingChallenges.get(gameId);
    if (!challenge || challenge.opponentId !== opponentId) {
      socket.emit('challenge:error', { message: 'Desafio inválido ou expirado.' });
      return;
    }

    // Use excludeGameId to allow accepting a challenge even if the user is "busy" with the challenge itself
    if (this.isUserBusy(challenge.challenger.id, gameId) || this.isUserBusy(opponentId, gameId)) {
        socket.emit('challenge:error', { message: 'Um dos jogadores está ocupado em outra partida.' });
        return;
    }

    clearTimeout(challenge.timeout);
    this.pendingChallenges.delete(gameId);

    const opponent: Player = { id: opponentId, username: socket.user!.username, socketId: socket.id, score: 0, hasAnswered: false, isBot: false, isReady: false };
    this.gameService.createGame(challenge.challenger, opponent, challenge.config);

    this.io.to(challenge.challenger.socketId).emit('challenge:response', { type: 'accepted', gameId });
  }

  public declineChallenge(socket: AuthenticatedSocket, gameId: string) {
    const challenge = this.pendingChallenges.get(gameId);
    if (!challenge) return;

    clearTimeout(challenge.timeout);
    this.pendingChallenges.delete(gameId);

    this.io.to(challenge.challenger.socketId).emit('challenge:response', {
      type: 'declined',
      gameId,
      message: `${socket.user?.username} recusou o desafio.`
    });
  }
  
  public cancelChallenge(socket: AuthenticatedSocket, gameId: string) {
    const challengerId = socket.user?.userId;
    const challenge = this.pendingChallenges.get(gameId);
    
    if (challenge && challenge.challenger.id === challengerId) {
      clearTimeout(challenge.timeout);
      this.pendingChallenges.delete(gameId);
      
      const opponent = this.onlineUsers.get(challenge.opponentId);
      if (opponent) {
        this.io.to(opponent.socketId).emit('challenge:canceled', { gameId, message: 'O oponente cancelou o desafio.' });
      }
    }
  }


  private isUserBusy(userId: string, excludeGameId: string | null = null): boolean {
    if (this.gameService.isUserInActiveGame(userId)) {
      return true;
    }
    for (const game of this.pendingGames.values()) {
      if (game.player1.id === userId) return true;
    }
    for (const [gameId, challenge] of this.pendingChallenges.entries()) {
      if (gameId === excludeGameId) continue;
      if (challenge.challenger.id === userId || challenge.opponentId === userId) return true;
    }
    return false;
  }
}

export default MatchmakingService;
