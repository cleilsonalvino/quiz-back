import { z } from 'zod';

export const friendRequestSchema = z.object({
  body: z.object({
    friendId: z.string().uuid('ID de amigo inválido.'),
  }),
});

export const respondToRequestSchema = z.object({
  body: z.object({
    requesterId: z.string().uuid('ID do solicitante inválido.'),
  }),
});

export const deleteFriendSchema = z.object({
  params: z.object({
    friendId: z.string().uuid('ID de amigo inválido.'),
  }),
});

export type FriendRequestDTO = z.infer<typeof friendRequestSchema>['body'];
export type RespondToRequestDTO = z.infer<typeof respondToRequestSchema>['body'];
export type DeleteFriendDTO = z.infer<typeof deleteFriendSchema>['params'];
