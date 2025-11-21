import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    username: z.string().min(3, 'Username deve ter no mínimo 3 caracteres'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
    googleId: z.string().optional(),
  }).refine(data => data.password || data.googleId, {
    message: 'Senha ou googleId é obrigatório',
    path: ['password'],
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().optional(),
    googleId: z.string().optional(),
  }),
});

export const forgotPasswordRequestSchema = z.object({
  body: z.object({
    identifier: z.string().min(1, 'Identificador (email ou username) é obrigatório'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    identifier: z.string().min(1, 'Identificador (email ou username) é obrigatório'),
    code: z.string().min(1, 'Código é obrigatório'),
    newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
  }),
});

export const searchUsersSchema = z.object({
  query: z.object({
    query: z.string().min(1, 'Parâmetro de busca "query" é obrigatório.'),
  }),
});

// Type definitions for convenience
export type RegisterUserDTO = z.infer<typeof registerUserSchema>['body'];
export type LoginUserDTO = z.infer<typeof loginUserSchema>['body'];
export type ForgotPasswordRequestDTO = z.infer<typeof forgotPasswordRequestSchema>['body'];
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>['body'];
export type SearchUsersDTO = z.infer<typeof searchUsersSchema>['query'];
