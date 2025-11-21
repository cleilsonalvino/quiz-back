import { z } from 'zod';

export const findMatchSchema = z.object({
  category: z.string(),
  numQuestions: z.number().positive(),
  quizTime: z.number().positive(),
});

export const cancelMatchmakingSchema = z.object({
  gameId: z.string(),
});

export type FindMatchDTO = z.infer<typeof findMatchSchema>;
export type CancelMatchmakingDTO = z.infer<typeof cancelMatchmakingSchema>;
