import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface AuthenticatedSocket extends Socket {
  user?: {
    userId: string;
    username: string;
  };
}

export const socketAuthMiddleware = (socket: AuthenticatedSocket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error: Token not provided.'));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { userId: string; username: string };
    socket.user = {
      userId: decoded.userId,
      username: decoded.username,
    };
    next();
  } catch (error) {
    return next(new Error('Authentication error: Invalid token.'));
  }
};
