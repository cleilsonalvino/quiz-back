import { z } from 'zod';

export const submitAnswerSchema = z.object({
  gameId: z.string(),
  questionIndex: z.number(),
  selectedOption: z.string(),
});

export const surrenderGameSchema = z.object({
  gameId: z.string(),
});

export const playerReadySchema = z.object({
  gameId: z.string(),
});

export type SubmitAnswerDTO = z.infer<typeof submitAnswerSchema>;
export type SurrenderGameDTO = z.infer<typeof surrenderGameSchema>;
export type PlayerReadyDTO = z.infer<typeof playerReadySchema>;
