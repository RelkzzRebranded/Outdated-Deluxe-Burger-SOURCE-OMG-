import { computed } from '@rbxts/charm';
import { produce } from '@rbxts/immut';
import { MusicState } from './types';
import { MusicAtom } from './atom';

export class MusicStateManager {
  public static getState(): MusicState {
    return MusicAtom();
  }

  public static setState(state: MusicState): void {
    MusicAtom(state);
  }

  public static selectState(): () => MusicState {
    return computed(() => MusicAtom());
  }
}
