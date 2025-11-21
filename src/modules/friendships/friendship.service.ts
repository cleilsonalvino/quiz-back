import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../shared/errors';
import MatchmakingService from '../matchmaking/matchmaking.service';

const prisma = new PrismaClient();

class FriendshipService {
  private io: Server;
  private matchmakingService: MatchmakingService;

  constructor(io: Server, matchmakingService: MatchmakingService) {
    this.io = io;
    this.matchmakingService = matchmakingService;
  }

  public async sendRequest(requesterId: string, addresseeId: string) {
    if (requesterId === addresseeId) {
      throw new AppError('Você não pode enviar uma solicitação para si mesmo.', 400);
    }

    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId, addresseeId, status: 'ACCEPTED' },
          { requesterId: addresseeId, addresseeId: requesterId, status: 'ACCEPTED' },
        ],
      },
    });

    if (existingFriendship) {
      throw new AppError('Vocês já são amigos.', 409);
    }
    
    // Check for inverse request and auto-accept
    const inverseRequest = await prisma.friendship.findUnique({
        where: { requesterId_addresseeId: { requesterId: addresseeId, addresseeId: requesterId } }
    });

    if(inverseRequest && inverseRequest.status === 'PENDING') {
        return this.acceptRequest(requesterId, addresseeId);
    }

    const newRequest = await prisma.friendship.create({
      data: { requesterId, addresseeId, status: 'PENDING' },
      include: { requester: { select: { username: true } } },
    });

    const onlineUsers = this.matchmakingService.getOnlineUsers();
    const addresseeSocket = onlineUsers.get(addresseeId);
    if (addresseeSocket) {
      this.io.to(addresseeSocket.socketId).emit('friendship:request_received', {
        requesterId,
        requesterUsername: newRequest.requester.username,
      });
    }
    return newRequest;
  }

  public async acceptRequest(userId: string, requesterId: string) {
    const request = await prisma.friendship.findFirst({
        where: { requesterId, addresseeId: userId, status: 'PENDING' },
    });

    if(!request) {
        throw new AppError('Solicitação de amizade não encontrada.', 404);
    }
    
    const updatedFriendship = await prisma.friendship.update({
        where: { id: request.id },
        data: { status: 'ACCEPTED' },
        include: {
            requester: { select: { username: true } },
            addressee: { select: { username: true } },
        }
    });

    const onlineUsers = this.matchmakingService.getOnlineUsers();
    const requesterSocket = onlineUsers.get(requesterId);
    if(requesterSocket) {
        this.io.to(requesterSocket.socketId).emit('friendship:accepted', {
            friendUsername: updatedFriendship.addressee.username,
        });
    }

    const addresseeSocket = onlineUsers.get(userId);
    if(addresseeSocket) {
        this.io.to(addresseeSocket.socketId).emit('friendship:accepted', {
            friendUsername: updatedFriendship.requester.username,
        });
    }
    
    return updatedFriendship;
  }
  
  public async declineRequest(userId: string, requesterId: string) {
      const request = await prisma.friendship.findFirst({
          where: { requesterId, addresseeId: userId, status: 'PENDING' },
      });

      if(!request) {
          throw new AppError('Solicitação de amizade não encontrada.', 404);
      }
      
      await prisma.friendship.delete({ where: { id: request.id } });
      
      // Notify the requester
      const onlineUsers = this.matchmakingService.getOnlineUsers();
      const requesterSocket = onlineUsers.get(requesterId);
      if(requesterSocket) {
          this.io.to(requesterSocket.socketId).emit('friendship:declined', {
              addresseeId: userId
          });
      }
  }
  
  public async listPending(userId: string) {
      return prisma.friendship.findMany({
          where: { addresseeId: userId, status: 'PENDING' },
          include: { requester: { select: { id: true, username: true, profileImage: true } } },
      });
  }
  
  public async listAccepted(userId: string) {
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
      
      return friendships.map((f: any) => {
          const friendData = f.requesterId === userId ? f.addressee : f.requester;
          return {
              ...friendData,
              status: onlineUsers.has(friendData.id) ? 'Online' : 'Offline',
          }
      });
  }
  
  public async removeFriend(currentUserId: string, friendId: string) {
      const friendship = await prisma.friendship.findFirst({
          where: {
              status: 'ACCEPTED',
              OR: [
                  { requesterId: currentUserId, addresseeId: friendId },
                  { requesterId: friendId, addresseeId: currentUserId },
              ],
          },
      });

      if(!friendship) {
          throw new AppError('Amizade não encontrada.', 404);
      }
      
      return prisma.friendship.delete({ where: { id: friendship.id } });
  }
}

export default FriendshipService;
