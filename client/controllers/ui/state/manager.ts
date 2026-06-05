import { computed } from '@rbxts/charm';
import { produce } from '@rbxts/immut';
import { UIAtom } from './atom';
import { UIState } from './types';

export class UIStateManager {
  public static getState(): UIState {
    return UIAtom();
  }

  public static setState(state: UIState): void {
    UIAtom(state);
  }

  public static selectState(): () => UIState {
    return computed(() => UIAtom());
  }

  public static updateState(mutator: (state: UIState) => void): void {
    UIAtom((state: UIState): UIState => {
      return produce(state, (draft: UIState) => {
        mutator(draft);
      });
    });
  }
}
