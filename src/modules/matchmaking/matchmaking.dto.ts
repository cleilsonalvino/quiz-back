import { z } from 'zod';

export const findMatchSchema = z.object({
  category: z.string(),
  numQuestions: z.number().positive(),
  quizTime: z.number().positive(),
});

export const cancelMatchmakingSchema = z.object({
  gameId: z.string(),
});

export const joinPendingGameSchema = z.object({
  gameId: z.string(),
});

export const challengeSchema = z.object({
  opponentId: z.string(),
  category: z.string(),
  numQuestions: z.number().positive(),
  quizTime: z.number().positive(),
});

export const acceptChallengeSchema = z.object({
  gameId: z.string(),
});

export const declineChallengeSchema = z.object({
  gameId: z.string(),
});

export const cancelChallengeSchema = z.object({
  gameId: z.string(),
});


export type FindMatchDTO = z.infer<typeof findMatchSchema>;
export type CancelMatchmakingDTO = z.infer<typeof cancelMatchmakingSchema>;
export type JoinPendingGameDTO = z.infer<typeof joinPendingGameSchema>;
export type ChallengeDTO = z.infer<typeof challengeSchema>;
export type AcceptChallengeDTO = z.infer<typeof acceptChallengeSchema>;
export type DeclineChallengeDTO = z.infer<typeof declineChallengeSchema>;
export type CancelChallengeDTO = z.infer<typeof cancelChallengeSchema>;
