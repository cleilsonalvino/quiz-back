import { Socket } from 'socket.io';
import CustomRoomsService from './custom-rooms.service';
import { createRoomSchema, joinRoomSchema, leaveRoomSchema, startGameSchema } from './custom-rooms.dto';

interface AuthenticatedSocket extends Socket {
  user?: { userId: string; username: string; };
}

class CustomRoomsSocketHandler {
  constructor(private customRoomsService: CustomRoomsService) {}

  public handleConnection(socket: AuthenticatedSocket): void {
    socket.on('customRoom:create', (data) => {
      try {
        const validatedData = createRoomSchema.parse(data);
        this.customRoomsService.createRoom(socket, validatedData);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for creating room.', details: error });
      }
    });

    socket.on('customRoom:join', (data) => {
      try {
        const validatedData = joinRoomSchema.parse(data);
        this.customRoomsService.joinRoom(socket, validatedData.roomCode);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for joining room.', details: error });
      }
    });
    
    socket.on('customRoom:leave', (data) => {
        try {
            const validatedData = leaveRoomSchema.parse(data);
            this.customRoomsService.leaveRoom(socket, validatedData.roomCode);
        } catch (error) {
            socket.emit('error', { message: 'Invalid data for leaving room.', details: error });
        }
    });

    socket.on('customRoom:start', (data) => {
      try {
        const validatedData = startGameSchema.parse(data);
        this.customRoomsService.startGame(socket, validatedData.roomCode);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for starting game.', details: error });
      }
    });
    
    // We could add a generic "leave all rooms on disconnect" logic here,
    // but the matchmaking disconnect handler is already complex.
    // For now, leaving this part out to avoid conflicts. The user can explicitly leave.
  }
}

export default CustomRoomsSocketHandler;
