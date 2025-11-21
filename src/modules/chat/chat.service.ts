import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import MatchmakingService from '../matchmaking/matchmaking.service';

class ChatService {
  private io: Server;
  private matchmakingService: MatchmakingService;

  constructor(io: Server, matchmakingService: MatchmakingService) {
    this.io = io;
    this.matchmakingService = matchmakingService;
  }

  public async sendMessage(fromUserId: string, toUserId: string, message: string) {
    const newMessage = await prisma.message.create({
      data: { fromUserId, toUserId, message },
    });

    // Emit to the recipient's room and to the sender's socket
    this.io.to(toUserId).emit('chat:new_message', newMessage);
    this.io.to(fromUserId).emit('chat:new_message', newMessage);
    
    return newMessage;
  }

  public async getHistory(userId1: string, userId2: string) {
    return prisma.message.findMany({
      where: {
        OR: [
          { fromUserId: userId1, toUserId: userId2 },
          { fromUserId: userId2, toUserId: userId1 },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  public async markMessagesAsRead(userId: string, friendId: string) {
    await prisma.message.updateMany({
      where: {
        fromUserId: friendId,
        toUserId: userId,
        read: false,
      },
      data: { read: true },
    });
    // Optionally, emit an event to notify the friend that messages were read
  }

  public async getFriendsWithUnread(userId: string) {
    const friendships = await prisma.friendship.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [{ requesterId: userId }, { addresseeId: userId }],
      },
      include: {
        requester: { select: { id: true, username: true, profileImage: true } },
        addressee: { select: { id: true, username: true, profileImage: true } },
      }
    });

    const onlineUsers = this.matchmakingService.getOnlineUsers();

    const friendsWithMessages = await Promise.all(
      friendships.map(async (f: any) => {
        const friendData = f.requesterId === userId ? f.addressee : f.requester;
        
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { fromUserId: userId, toUserId: friendData.id },
              { fromUserId: friendData.id, toUserId: userId },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });

        const unreadMessagesCount = await prisma.message.count({
          where: {
            fromUserId: friendData.id,
            toUserId: userId,
            read: false
          }
        });

        return {
          ...friendData,
          status: onlineUsers.has(friendData.id) ? 'Online' : 'Offline',
          lastMessage: lastMessage?.message || "Nenhuma mensagem ainda",
          unreadMessages: unreadMessagesCount
        };
      })
    );
    
    return friendsWithMessages;
  }
}

export default ChatService;
