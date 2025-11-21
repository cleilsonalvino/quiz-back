import { Player, GameConfig } from '../game/game.types';

export interface CustomRoomPlayer extends Player {
  isHost: boolean;
}

export interface CustomRoom {
  roomCode: string;
  hostId: string;
  players: CustomRoomPlayer[];
  config: GameConfig;
}
