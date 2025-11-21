import { Router } from 'express';
import { userRouter } from '../modules/users/user.routes';
import { friendshipRouter } from '../modules/friendships/friendship.routes';
import { chatRouter } from '../modules/chat/chat.routes';


const router = Router();
const apiV1Router = Router();

// A health check route
router.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Register all module routers under the /api/v1 prefix
apiV1Router.use('/users', userRouter);
apiV1Router.use('/friends', friendshipRouter);
apiV1Router.use('/', chatRouter); // Routes like /messages/:userId
// apiV1Router.use('/ranking', rankingRouter); // Placeholder

router.use('/api/v1', apiV1Router);


export { router };
