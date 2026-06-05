import { CharacterRig } from 'shared';
import { NormalNoob } from './types/normal-noob';

export const NpcRegistry: Record<string, (model: CharacterRig) => void> = {
  ['normal_noob']: NormalNoob,
};
