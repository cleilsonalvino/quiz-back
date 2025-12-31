import { Server, Socket } from 'socket.io';
import GameService from '../game/game.service';
import { CustomRoom, CustomRoomPlayer } from './custom-rooms.types';
import { CreateRoomDTO } from './custom-rooms.dto';
import { Player, GameConfig } from '../game/game.types';

interface AuthenticatedSocket extends Socket {
  user?: { userId: string; username: string; };
}

class CustomRoomsService {
  private customRooms = new Map<string, CustomRoom>();

  constructor(private gameService: GameService, private io: Server) {
    console.log('[CustomRoomsService] Initialized');
  }

  private generateRoomCode(): string {
    let code: string;
    do {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (this.customRooms.has(code));
    return code;
  }

  private emitRoomUpdate(roomCode: string) {
    const room = this.customRooms.get(roomCode);
    if (room) {
      this.io.to(roomCode).emit('customRoom:update', room);
    }
  }

  public createRoom(socket: AuthenticatedSocket, config: CreateRoomDTO) {
    const userId = socket.user?.userId;
    const username = socket.user?.username;
    if (!userId || !username) return;

    const roomCode = this.generateRoomCode();
    const hostPlayer: CustomRoomPlayer = {
      id: userId,
      username,
      socketId: socket.id,
      isHost: true,
      isReady: false,
      score: 0,
      hasAnswered: false,
      isBot: false,
    };

    const room: CustomRoom = {
      roomCode,
      hostId: userId,
      players: [hostPlayer],
      config: {
        category: config.category,
        numQuestions: config.numQuestions,
        quizTime: config.quizTime,
      },
    };

    this.customRooms.set(roomCode, room);
    socket.join(roomCode);
    this.emitRoomUpdate(roomCode);
    console.log(`[CustomRooms] Room ${roomCode} created by ${username}.`);
  }

  public joinRoom(socket: AuthenticatedSocket, roomCode: string) {
    const userId = socket.user?.userId;
    const username = socket.user?.username;
    if (!userId || !username) return;

    const room = this.customRooms.get(roomCode);
    if (!room) {
      socket.emit('customRoom:error', { message: 'Sala não encontrada.' });
      return;
    }
    
    if (room.players.length >= 2) {
      socket.emit('customRoom:error', { message: 'A sala está cheia.' });
      return;
    }

    if (room.players.some(p => p.id === userId)) {
      room.players.find(p => p.id === userId)!.socketId = socket.id;
    } else {
      const newPlayer: CustomRoomPlayer = {
        id: userId,
        username,
        socketId: socket.id,
        isHost: false,
        isReady: false,
        score: 0,
        hasAnswered: false,
        isBot: false,
      };
      room.players.push(newPlayer);
    }
    
    socket.join(roomCode);
    this.emitRoomUpdate(roomCode);
    console.log(`[CustomRooms] ${username} joined room ${roomCode}.`);
  }

  public leaveRoom(socket: AuthenticatedSocket, roomCode: string) {
    const userId = socket.user?.userId;
    const room = this.customRooms.get(roomCode);

    if (room && userId) {
      room.players = room.players.filter(p => p.id !== userId);
      socket.leave(roomCode);

      if (room.players.length === 0) {
        this.customRooms.delete(roomCode);
        console.log(`[CustomRooms] Room ${roomCode} is empty and has been deleted.`);
      } else {
        if (room.hostId === userId) {
          room.hostId = room.players[0].id;
          room.players[0].isHost = true;
        }
        this.emitRoomUpdate(roomCode);
      }
    }
  }

  public toggleReady(socket: AuthenticatedSocket, roomCode: string) {
    const userId = socket.user?.userId;
    const room = this.customRooms.get(roomCode);
    if (!room || !userId) return;

    const player = room.players.find(p => p.id === userId);
    if (player) {
      player.isReady = !player.isReady;
      this.emitRoomUpdate(roomCode);
    }
  }
  
  public startGame(socket: AuthenticatedSocket, roomCode: string) {
    const userId = socket.user?.userId;
    const room = this.customRooms.get(roomCode);

    if (!room) return;
    if (room.hostId !== userId) {
      socket.emit('customRoom:error', { message: 'Apenas o host pode iniciar a partida.' });
      return;
    }
    if (room.players.length < 2) {
       socket.emit('customRoom:error', { message: 'São necessários pelo menos 2 jogadores.' });
       return;
    }
    
    const allReady = room.players.every(p => p.isReady);
    if (!allReady) {
      socket.emit('customRoom:error', { message: 'Todos os jogadores precisam estar prontos.' });
      return;
    }
    
    const player1: Player = { ...room.players[0], isReady: false }; // Reset for GameService readiness
    const player2: Player = { ...room.players[1], isReady: false }; // Reset for GameService readiness
    
    this.gameService.createGame(player1, player2, room.config);
    
    this.customRooms.delete(roomCode);
  }
}

export default CustomRoomsService;
