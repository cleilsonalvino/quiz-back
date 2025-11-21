import { Player, GameConfig } from '../game/game.types';

export interface QueuedPlayer {
  id: string;
  username: string;
  socketId: string;
}

export interface PendingGame {
  id: string;
  player1: Player;
  config: GameConfig;
  botTimeout: NodeJS.Timeout;
}
