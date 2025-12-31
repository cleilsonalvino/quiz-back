import { Router } from 'express';
import RankingController from './ranking.controller';
import RankingService from './ranking.service';
import { authMiddleware } from '../../app/middlewares/auth.middleware';

const rankingRouter = Router();

const rankingService = new RankingService();
const rankingController = new RankingController(rankingService);

rankingRouter.use(authMiddleware);

rankingRouter.get('/', rankingController.getRank);

export { rankingRouter };
