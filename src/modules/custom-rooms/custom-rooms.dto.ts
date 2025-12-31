import { z } from 'zod';
import { findMatchSchema } from '../matchmaking/matchmaking.dto'; // Re-use the config part

export const createRoomSchema = findMatchSchema; // The config is the same
export const joinRoomSchema = z.object({ roomCode: z.string() });
export const leaveRoomSchema = z.object({ roomCode: z.string() });
export const toggleReadySchema = z.object({ roomCode: z.string() });
export const startGameSchema = z.object({ roomCode: z.string() });

export type CreateRoomDTO = z.infer<typeof createRoomSchema>;
export type JoinRoomDTO = z.infer<typeof joinRoomSchema>;
export type LeaveRoomDTO = z.infer<typeof leaveRoomSchema>;
export type ToggleReadyDTO = z.infer<typeof toggleReadySchema>;
export type StartGameDTO = z.infer<typeof startGameSchema>;
