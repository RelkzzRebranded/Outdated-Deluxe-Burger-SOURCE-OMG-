import { Controller } from '@flamework/core';
import { OnCharacterAdd } from 'client/hooks';
import { CharacterRig } from 'shared';
import { UIStateManager } from './state';
import { effect } from '@rbxts/charm';
import { PlayerGunShopController } from './player-gunshop';
import { mainScreen } from 'client/constants';

@Controller({ loadOrder: -1 })
export class MainUIController implements OnCharacterAdd {
  private gui = mainScreen.Gameplay;
  private UIAtom = UIStateManager.selectState();
  public constructor(gunshopUI: PlayerGunShopController) {
    const hideMainUIS = [gunshopUI];
    const tryEnableMain = () => {
      if (!hideMainUIS.every((ui) => !ui.isEnabled())) return;
      this.toggle(true);
    };

    // you can utilize this for disabling other UIs
    gunshopUI.toggled.Connect((on) => {
      if (!on) tryEnableMain();
      mainScreen.Underlay.Visible = on;
      this.toggle(false);
    });
    effect(() => {
      const page = this.UIAtom().page;
      switch (page) {
        case 'shop':
          gunshopUI.toggle();
          break;
        case 'gameplay':
          gunshopUI.toggle(false);
          this.toggle(true);
          break;
        default:
          gunshopUI.toggle(false);
          break;
      }
    });
  }

  public onCharacterAdd(character: CharacterRig): void {
    print(character);
  }

  public toggle(on: boolean): void {
    this.gui.Visible = on;
  }
}
