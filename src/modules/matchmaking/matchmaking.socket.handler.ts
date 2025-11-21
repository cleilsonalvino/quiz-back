import { Socket } from 'socket.io';
import MatchmakingService from './matchmaking.service';
import { findMatchSchema, cancelMatchmakingSchema } from './matchmaking.dto';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

class MatchmakingSocketHandler {
  constructor(private matchmakingService: MatchmakingService) {}

  public handleConnection(socket: AuthenticatedSocket): void {
    // This is called right after authentication
    this.matchmakingService.handleNewConnection(socket);

    socket.on('matchmaking:find', (data) => {
      try {
        const validatedData = findMatchSchema.parse(data);
        this.matchmakingService.findPublicMatch(socket, validatedData);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for findMatch.', details: error });
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

    socket.on('disconnect', (reason) => {
      this.matchmakingService.handleDisconnect(socket);
    });
  }
}

export default MatchmakingSocketHandler;
