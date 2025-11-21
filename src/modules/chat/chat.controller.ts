import { Request, Response, NextFunction } from 'express';
import ChatService from './chat.service';
import { GetMessagesDTO, MarkAsReadDTO } from './chat.dto';
import { AppError } from '../../shared/errors';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

class ChatController {
  constructor(private chatService: ChatService) {}

  public getHistory = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const currentUserId = req.user?.userId;
      const { userId: friendId } = req.params as unknown as GetMessagesDTO;
      if (!currentUserId) throw new AppError('Usuário não autenticado.', 401);
      
      const messages = await this.chatService.getHistory(currentUserId, friendId);
      return res.json(messages);
    } catch (error) {
      next(error);
    }
  };

  public markAsRead = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const currentUserId = req.user?.userId;
      const { friendId } = req.params as unknown as MarkAsReadDTO;
      if (!currentUserId) throw new AppError('Usuário não autenticado.', 401);

      await this.chatService.markMessagesAsRead(currentUserId, friendId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
  
  public getFriendsWithUnread = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new AppError('Usuário não autenticado.', 401);
      
      const friends = await this.chatService.getFriendsWithUnread(userId);
      return res.json(friends);
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
