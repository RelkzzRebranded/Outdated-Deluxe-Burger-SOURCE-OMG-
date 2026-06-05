import { atom } from '@rbxts/charm';
import { MusicState } from './types';

export const MusicAtom = atom<MusicState>({
  song: 'gameplay',
});
