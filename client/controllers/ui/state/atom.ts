import { atom } from '@rbxts/charm';
import { UIState } from './types';

export const UIAtom = atom<UIState>({
  page: 'gameplay',
});
