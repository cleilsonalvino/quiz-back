import { Request, Response } from 'express';
import RankingService from './ranking.service';

class RankingController {
  constructor(private rankingService: RankingService) {}

  public async getRank(req: Request, res: Response) {
    try {
      const topPlayers = await this.rankingService.getTopPlayers();
      res.json(topPlayers);
    } catch (error) {
      console.error('Error fetching ranking:', error);
      res.status(500).json({ message: 'Internal server error while fetching ranking.' });
    }
  }
}

export default RankingController;
