import { Request, Response, NextFunction } from 'express';
import userService from './user.service.ts';
import { RegisterUserDTO, LoginUserDTO, ForgotPasswordRequestDTO, ResetPasswordDTO } from './user.dto';
import { AppError } from '../../shared/errors';

// Extend Request to include user property
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

class UserController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userData: RegisterUserDTO = req.body;
      const result = await userService.register(userData);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const loginData: LoginUserDTO = req.body;
      console.log(loginData)
      const result = await userService.login(loginData);
      return res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao fazer login.' });
    }
  }

  public async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Usuário não autenticado.', 401);
      }
      const profileData = await userService.getProfile(userId);
      return res.json(profileData);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao buscar perfil.' });
    }
  }

  public async uploadProfileImage(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Usuário não autenticado.', 401);
      }
      if (!req.file) {
        throw new AppError('Nenhuma imagem foi enviada.', 400);
      }
      const imagePath = `/uploads/profile-images/${req.file.filename}`;
      const updatedUser = await userService.uploadProfileImage(userId, imagePath);
      return res.status(200).json({
        message: 'Imagem de perfil atualizada com sucesso!',
        profileImage: updatedUser.profileImage,
      });
    } catch (error) {
      // Basic cleanup
      if (req.file) {
        // fs.unlink... can be added here
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao salvar a imagem de perfil.' });
    }
  }

  public async requestPasswordResetCode(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const requestData: ForgotPasswordRequestDTO = req.body;
      await userService.requestPasswordResetCode(requestData);
      return res.status(200).json({ message: 'Se o usuário existir, um email de recuperação foi enviado.' });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao solicitar recuperação de senha.' });
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const resetData: ResetPasswordDTO = req.body;
      await userService.resetPassword(resetData);
      return res.status(200).json({ message: 'Senha alterada com sucesso.' });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao alterar a senha.' });
    }
  }

  public async listAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const users = await userService.listAll();
      return res.json(users);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao buscar usuários.' });
    }
  }

  public async deleteSelf(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Usuário não autenticado.', 401);
      }
      const deletedUser = await userService.deleteSelf(userId);
      res.json({ message: 'Usuário excluído com sucesso!', user: deletedUser });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao excluir usuário.' });
    }
  }

  public async search(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const currentUserId = req.user?.userId;
      if (!currentUserId) {
        throw new AppError('Usuário não autenticado.', 401);
      }
      const { query } = req.query;
      const users = await userService.search(query as string, currentUserId);
      return res.json(users);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao buscar usuário.' });
    }
  }

  public async getPublicProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { userId } = req.params;
      const user = await userService.getPublicProfile(userId);
      return res.json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao buscar perfil do usuário.' });
    }
  }

  public async listLight(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const currentUserId = req.user?.userId;
      if (!currentUserId) {
        throw new AppError('Usuário não autenticado.', 401);
      }
      const users = await userService.listLight(currentUserId);
      return res.json(users);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno ao buscar lista de usuários.' });
    }
  }
}

export default new UserController();
