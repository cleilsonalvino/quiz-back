import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RankingService {
  public async getTopPlayers(take: number = 100) {
    return prisma.user.findMany({
      orderBy: {
        score: 'desc',
      },
      take,
      select: {
        id: true,
        username: true,
        score: true,
        profileImage: true,
      },
    });
  }
}

export default RankingService;
