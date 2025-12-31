import { Router } from 'express';
import ChatController from './chat.controller';
import ChatService from './chat.service';
import { authMiddleware } from '../../app/middlewares/auth.middleware';
import { io, matchmakingService } from '../../index';

const chatRouter = Router();

// Instantiate dependencies
const chatService = new ChatService(io, matchmakingService);
const chatController = new ChatController(chatService);

// All routes are protected
chatRouter.use(authMiddleware);

chatRouter.get('/messages/:userId', chatController.getHistory);
chatRouter.post('/messages/mark-read/:friendId', chatController.markAsRead);
chatRouter.get('/friends-with-unread', chatController.getFriendsWithUnread);
chatRouter.get('/messages/unread-count', chatController.getUnreadCount); // New route

export { chatRouter };
