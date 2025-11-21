import { z } from 'zod';

// === Socket DTOs ===

export const privateMessageSchema = z.object({
  to: z.string().uuid(),
  message: z.string().min(1),
});
export type PrivateMessageDTO = z.infer<typeof privateMessageSchema>;


// === REST DTOs ===

export const getMessagesSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
});
export type GetMessagesDTO = z.infer<typeof getMessagesSchema>['params'];

export const markAsReadSchema = z.object({
  params: z.object({
    friendId: z.string().uuid(),
  }),
});
export type MarkAsReadDTO = z.infer<typeof markAsReadSchema>['params'];
