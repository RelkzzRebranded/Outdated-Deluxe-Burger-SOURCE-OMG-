import { atom } from '@rbxts/charm';
import { GameState } from './types';

export const gameAtom = atom<GameState>({
  countdown: 30,
  spawning: false,
  wave: 0,
  players: 0,
  enemies: 0,
  skipVotes: 0,
  skipVotesRequired: 6,
  phase: 'waiting',
});
