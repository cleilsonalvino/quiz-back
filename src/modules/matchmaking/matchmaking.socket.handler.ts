import { Socket } from 'socket.io';
import MatchmakingService from './matchmaking.service';
import { 
  findMatchSchema, 
  cancelMatchmakingSchema,
  joinPendingGameSchema,
  challengeSchema,
  acceptChallengeSchema,
  declineChallengeSchema,
  cancelChallengeSchema,
} from './matchmaking.dto';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

class MatchmakingSocketHandler {
  constructor(private matchmakingService: MatchmakingService) {}

  public handleConnection(socket: AuthenticatedSocket): void {
    this.matchmakingService.handleNewConnection(socket);

    socket.on('matchmaking:createPublicMatch', (data) => {
      try {
        const validatedData = findMatchSchema.parse(data);
        this.matchmakingService.createPublicMatch(socket, validatedData);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for createPublicMatch.', details: error });
      }
    });

    socket.on('matchmaking:joinPendingGame', (data) => {
      try {
        const validatedData = joinPendingGameSchema.parse(data);
        this.matchmakingService.joinPendingGame(socket, validatedData.gameId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for joinPendingGame.', details: error });
      }
    });

    socket.on('matchmaking:cancel', (data) => {
      try {
        const validatedData = cancelMatchmakingSchema.parse(data);
        this.matchmakingService.cancelMatchmaking(socket, validatedData.gameId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for cancelMatchmaking.', details: error });
      }
    });

    // --- Challenges ---
    socket.on('challenge:create', (data) => {
      try {
        const validatedData = challengeSchema.parse(data);
        this.matchmakingService.createChallenge(socket, validatedData);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for challenge:create.', details: error });
      }
    });

    socket.on('challenge:accept', (data) => {
      try {
        const validatedData = acceptChallengeSchema.parse(data);
        this.matchmakingService.acceptChallenge(socket, validatedData.gameId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for challenge:accept.', details: error });
      }
    });

    socket.on('challenge:decline', (data) => {
      try {
        const validatedData = declineChallengeSchema.parse(data);
        this.matchmakingService.declineChallenge(socket, validatedData.gameId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for challenge:decline.', details: error });
      }
    });

    socket.on('challenge:cancel', (data) => {
      try {
        const validatedData = cancelChallengeSchema.parse(data);
        this.matchmakingService.cancelChallenge(socket, validatedData.gameId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for challenge:cancel.', details: error });
      }
    });


    socket.on('disconnect', () => {
      this.matchmakingService.handleDisconnect(socket);
    });
  }
}

export default MatchmakingSocketHandler;
