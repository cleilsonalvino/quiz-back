import http from 'http';
import { Server, Socket } from 'socket.io';
import app from './app/app';
import { env } from './app/config/env';
import { socketAuthMiddleware } from './app/middlewares/socket.auth.middleware';
import GameService from './modules/game/game.service';
import GameSocketHandler from './modules/game/game.socket.handler';
import MatchmakingService from './modules/matchmaking/matchmaking.service';
import MatchmakingSocketHandler from './modules/matchmaking/matchmaking.socket.handler';
import ChatService from './modules/chat/chat.service';
import ChatSocketHandler from './modules/chat/chat.socket.handler';
import CustomRoomsService from './modules/custom-rooms/custom-rooms.service';
import CustomRoomsSocketHandler from './modules/custom-rooms/custom-rooms.socket.handler';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Create service instances
const gameService = new GameService(io);
const matchmakingService = new MatchmakingService(gameService, io);
const chatService = new ChatService(io, matchmakingService);
const customRoomsService = new CustomRoomsService(gameService, io);

// Create socket handlers
const gameSocketHandler = new GameSocketHandler(gameService);
const matchmakingSocketHandler = new MatchmakingSocketHandler(matchmakingService);
const chatSocketHandler = new ChatSocketHandler(chatService);
const customRoomsSocketHandler = new CustomRoomsSocketHandler(customRoomsService);

// Apply middlewares
io.use(socketAuthMiddleware);

// Handle connections
io.on('connection', (socket: AuthenticatedSocket) => {
  console.log(`[Index] Socket connected: ${socket.id}, User: ${socket.user?.username}`);

  // Register all handlers for the connection
  gameSocketHandler.handleConnection(socket);
  matchmakingSocketHandler.handleConnection(socket);
  chatSocketHandler.handleConnection(socket);
  customRoomsSocketHandler.handleConnection(socket);
  // Other handlers will be added here
});

server.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
  console.log(`🔗 http://localhost:${env.port}`);
});

export { io, gameService, matchmakingService, chatService, customRoomsService };
