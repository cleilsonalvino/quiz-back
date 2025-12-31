import { Socket } from 'socket.io';
import GameService from './game.service';
import { submitAnswerSchema, surrenderGameSchema, playerReadySchema } from './game.dto';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

class GameSocketHandler {
  constructor(private gameService: GameService) {}

  public handleConnection(socket: AuthenticatedSocket): void {
    socket.on('game:submitAnswer', (data) => {
      try {
        const validatedData = submitAnswerSchema.parse(data);
        const userId = socket.user?.userId;
        if (!userId) return;
        this.gameService.submitAnswer(validatedData.gameId, userId, validatedData.selectedOption);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for submitAnswer.', details: error });
      }
    });

    socket.on('game:surrender', (data) => {
      try {
        const validatedData = surrenderGameSchema.parse(data);
        const userId = socket.user?.userId;
        if (!userId) return;
        this.gameService.surrenderGame(validatedData.gameId, userId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for surrender.', details: error });
      }
    });

    socket.on('playerReadyForGame', (data) => {
      try {
        const validatedData = playerReadySchema.parse(data);
        const userId = socket.user?.userId;
        if (!userId) return;
        this.gameService.playerReady(validatedData.gameId, userId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for playerReady.', details: error });
      }
    });

    socket.on('disconnect', () => {
      // This is needed to handle in-game disconnects specifically
      this.gameService.handlePlayerDisconnect(socket);
    });
  }
}

export default GameSocketHandler;
