import { Socket } from 'socket.io';
import ChatService from './chat.service';
import { privateMessageSchema } from './chat.dto';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

class ChatSocketHandler {
  constructor(private chatService: ChatService) {}

  public handleConnection(socket: AuthenticatedSocket): void {
    const userId = socket.user?.userId;
    if (!userId) return;

    // Join a room identified by the user's ID
    socket.join(userId);
    console.log(`[Chat] User ${socket.user?.username} (${userId}) joined their chat room.`);

    socket.on('chat:send_message', (data) => {
      try {
        const validatedData = privateMessageSchema.parse(data);
        this.chatService.sendMessage(userId, validatedData.to, validatedData.message);
      } catch (error) {
        socket.emit('error', { message: 'Invalid data for chat message.', details: error });
      }
    });
  }
}

export default ChatSocketHandler;
