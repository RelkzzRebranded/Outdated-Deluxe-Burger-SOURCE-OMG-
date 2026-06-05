export type GamePhase = 'waiting' | 'countdown' | 'playing' | 'game_over';

export interface GameState {
  countdown: number;
  spawning: boolean;
  wave: number;
  players: number;
  enemies: number;
  skipVotes: number;
  skipVotesRequired: number;
  phase: GamePhase;
}
