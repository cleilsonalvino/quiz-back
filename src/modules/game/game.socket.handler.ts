import { Socket } from 'socket.io';
import GameService from './game.service';
import { submitAnswerSchema, surrenderGameSchema } from './game.dto';

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
        if (!userId) {
          socket.emit('error', { message: 'Authentication error.' });
          return;
        }
        this.gameService.submitAnswer(validatedData.gameId, userId, validatedData.selectedOption);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for submitAnswer.', details: error });
      }
    });

    socket.on('game:surrender', (data) => {
      try {
        const validatedData = surrenderGameSchema.parse(data);
        const userId = socket.user?.userId;
        if (!userId) {
          socket.emit('error', { message: 'Authentication error.' });
          return;
        }
        this.gameService.surrenderGame(validatedData.gameId, userId);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for surrender.', details: error });
      }
    });
  }
}

export default GameSocketHandler;
