import { Zone } from '@rbxts/quickzone';
import { UIStateManager } from '../ui/state';
import { BackgroundMusicPlayer } from '../music/main';
import { GameManager } from 'shared/game';

export const ZoneRegistry: Record<string, (zone: Zone) => void> = {
  ['Shop']: () => {
    if (UIStateManager.getState().page === 'game_over') return;
    UIStateManager.updateState((state) => (state.page = 'shop'));
    BackgroundMusicPlayer.changeSong('shop');
  },
  ['OnExitShop']: () => {
    UIStateManager.updateState((state) => (state.page = 'gameplay'));
    BackgroundMusicPlayer.clearOverride();
  },
};
