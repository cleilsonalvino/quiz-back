import { Router } from 'express';
import MatchHistoryController from './match-history.controller';
import MatchHistoryService from './match-history.service';
import { authMiddleware } from '../../app/middlewares/auth.middleware';

const matchHistoryRouter = Router();

const matchHistoryService = new MatchHistoryService();
const matchHistoryController = new MatchHistoryController(matchHistoryService);

matchHistoryRouter.use(authMiddleware);

matchHistoryRouter.get('/user/:userId/history', matchHistoryController.getUserHistory);

export { matchHistoryRouter };
