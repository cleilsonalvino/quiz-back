import { Request, Response, NextFunction } from 'express';
import FriendshipService from './friendship.service';
import { FriendRequestDTO, RespondToRequestDTO, DeleteFriendDTO } from './friendship.dto';
import { AppError } from '../../shared/errors';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  public sendRequest = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const requesterId = req.user?.userId;
      const { friendId } = req.body as FriendRequestDTO;
      if (!requesterId) throw new AppError('Usuário não autenticado.', 401);

      const request = await this.friendshipService.sendRequest(requesterId, friendId);
      return res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  };

  public acceptRequest = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = req.user?.userId;
      const { requesterId } = req.body as RespondToRequestDTO;
      if (!userId) throw new AppError('Usuário não autenticado.', 401);

      const friendship = await this.friendshipService.acceptRequest(userId, requesterId);
      return res.json(friendship);
    } catch (error) {
      next(error);
    }
  };

  public declineRequest = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = req.user?.userId;
      const { requesterId } = req.body as RespondToRequestDTO;
      if (!userId) throw new AppError('Usuário não autenticado.', 401);

      await this.friendshipService.declineRequest(userId, requesterId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
  
  public listPending = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new AppError('Usuário não autenticado.', 401);
      
      const requests = await this.friendshipService.listPending(userId);
      return res.json(requests);
    } catch (error) {
      next(error);
    }
  };

  public listAccepted = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new AppError('Usuário não autenticado.', 401);
      
      const friends = await this.friendshipService.listAccepted(userId);
      return res.json(friends);
    } catch (error) {
      next(error);
    }
  };
  
  public removeFriend = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = req.user?.userId;
      const { friendId } = req.params as unknown as DeleteFriendDTO;
      if (!userId) throw new AppError('Usuário não autenticado.', 401);

      await this.friendshipService.removeFriend(userId, friendId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default FriendshipController;
