import { Router } from 'express';
import userController from './user.controller';
import { authMiddleware } from '../../app/middlewares/auth.middleware';
import { uploadMiddleware } from '../../app/middlewares/multer.middleware';
// I will create a validation middleware later. For now, the controller handles it.

const userRouter = Router();

// Auth routes
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

// Password reset routes
userRouter.post('/forgot-password/request-code', userController.requestPasswordResetCode);
userRouter.post('/forgot-password/reset-password', userController.resetPassword);

// Profile routes (protected)
userRouter.get('/profile', authMiddleware, userController.getProfile);
userRouter.post(
  '/profile/upload-image',
  authMiddleware,
  uploadMiddleware.single('profileImage'),
  userController.uploadProfileImage
);

// General user routes (protected)
userRouter.get('/', authMiddleware, userController.listAll); // Corrected path
userRouter.get('/light', authMiddleware, userController.listLight); // Corrected path
userRouter.get('/search', authMiddleware, userController.search); // Corrected path
userRouter.get('/:userId', authMiddleware, userController.getPublicProfile); // Corrected path
userRouter.delete('/me', authMiddleware, userController.deleteSelf); // Corrected path


export { userRouter };
