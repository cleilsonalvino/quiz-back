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
userRouter.get('/users', authMiddleware, userController.listAll);
userRouter.get('/users/light', authMiddleware, userController.listLight);
userRouter.get('/users/search', authMiddleware, userController.search);
userRouter.get('/users/:userId', authMiddleware, userController.getPublicProfile);
userRouter.delete('/users/me', authMiddleware, userController.deleteSelf);


export { userRouter };
