import { Router } from 'express';
import FriendshipController from './friendship.controller';
import FriendshipService from './friendship.service';
import { authMiddleware } from '../../app/middlewares/auth.middleware';
import { io, matchmakingService } from '../../index'; // Import shared instances

const friendshipRouter = Router();

// This is a bit of a service locator pattern, which is not ideal.
// A proper DI container would be better, but for this refactoring, it's acceptable.
const friendshipService = new FriendshipService(io, matchmakingService);
const friendshipController = new FriendshipController(friendshipService);

// All routes are protected
friendshipRouter.use(authMiddleware);

friendshipRouter.post('/request', friendshipController.sendRequest);
friendshipRouter.post('/accept', friendshipController.acceptRequest);
friendshipRouter.post('/decline', friendshipController.declineRequest);
friendshipRouter.get('/requests', friendshipController.listPending);
friendshipRouter.get('/accepted', friendshipController.listAccepted);
friendshipRouter.delete('/delete/:friendId', friendshipController.removeFriend);


export { friendshipRouter };
