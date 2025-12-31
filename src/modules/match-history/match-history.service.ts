import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MatchHistoryService {
  public async getUserMatchHistory(userId: string) {
    return prisma.match.findMany({
      where: {
        OR: [{ player1Id: userId }, { player2Id: userId }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default MatchHistoryService;
