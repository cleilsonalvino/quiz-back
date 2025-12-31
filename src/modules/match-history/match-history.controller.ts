import { Request, Response, NextFunction } from 'express';
import MatchHistoryService from './match-history.service';
import { AppError } from '../../shared/errors';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

class MatchHistoryController {
  constructor(private matchHistoryService: MatchHistoryService) {}

  public getUserHistory = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params; // The user ID to get history for
      const currentUserId = req.user?.userId; // The authenticated user making the request

      // For security, ensure the authenticated user is allowed to view this history.
      // For now, we'll allow viewing any user's public history.
      // If stricter rules are needed (e.g., only self or friends), this logic should be added here.

      if (!currentUserId) throw new AppError('Usuário não autenticado.', 401);

      const history = await this.matchHistoryService.getUserMatchHistory(userId);
      return res.json(history);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchHistoryController;
