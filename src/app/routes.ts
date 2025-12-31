import { Router } from 'express';
import { userRouter } from '../modules/users/user.routes';
import { friendshipRouter } from '../modules/friendships/friendship.routes';
import { chatRouter } from '../modules/chat/chat.routes';
import { rankingRouter } from '../modules/ranking/ranking.routes';
import { matchHistoryRouter } from '../modules/match-history/match-history.routes';


const router = Router();
const apiV1Router = Router();

// Root route
router.get('/', (req, res) => {
  res.send('Estudelab Quiz Backend está funcionando!');
});

// A health check route
router.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

// App version route
router.get('/app-version', (req, res) => {
  res.json({
    latestVersion: '1.4', // Altere para a versão mais recente
    changelog: '📌 Chat Disponível\n🚀 Atualize o aplicativo e converse com seus amigos\n',
    updateUrl: 'https://play.google.com/store/apps/details?id=com.cleilsonalvino.quiz',
  });
});

// Register all module routers under the /api/v1 prefix
apiV1Router.use('/users', userRouter);
apiV1Router.use('/friends', friendshipRouter);
apiV1Router.use('/', chatRouter); // Routes like /messages/:userId
apiV1Router.use('/ranking', rankingRouter);
apiV1Router.use('/matches', matchHistoryRouter); // Mount match history router

router.use('/api/v1', apiV1Router);


export { router };
