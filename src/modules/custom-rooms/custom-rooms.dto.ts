import { z } from 'zod';
import { findMatchSchema } from '../matchmaking/matchmaking.dto'; // Re-use the config part

export const createRoomSchema = findMatchSchema; // The config is the same
export const joinRoomSchema = z.object({ roomCode: z.string().length(6) });
export const leaveRoomSchema = z.object({ roomCode: z.string().length(6) });
export const setReadySchema = z.object({ roomCode: z.string().length(6), isReady: z.boolean() });
export const startGameSchema = z.object({ roomCode: z.string().length(6) });

export type CreateRoomDTO = z.infer<typeof createRoomSchema>;
export type JoinRoomDTO = z.infer<typeof joinRoomSchema>;
export type LeaveRoomDTO = z.infer<typeof leaveRoomSchema>;
export type SetReadyDTO = z.infer<typeof setReadySchema>;
export type StartGameDTO = z.infer<typeof startGameSchema>;
