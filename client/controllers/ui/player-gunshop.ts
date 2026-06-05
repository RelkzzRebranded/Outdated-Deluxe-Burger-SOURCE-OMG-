/* eslint-disable roblox-ts/lua-truthiness */
import { Controller } from '@flamework/core';
import { GunShopUIController } from './gunshop';
import { Signal } from '@rbxts/beacon';
import { LocalPlayer, mainScreen } from 'client/constants';
import { DataController } from '../data/controller';
import { Functions } from 'client/network';
import { NetworkingFunctionError } from '@flamework/networking';
import { Data, DataManager } from 'shared';
import { effect } from '@rbxts/charm';

/**
 * WHAT TO LIST FOR THE GUN STATS:
 * - Price
 * - Gun Damage
 * - Fire Rate
 */

@Controller()
export class PlayerGunShopController extends GunShopUIController {
  public readonly toggled = new Signal<[on: boolean]>();
  private readonly selected = new Signal<[id: string]>();
  private selectedData = DataManager.selectData(LocalPlayer.UserId);
  private selectedID!: string;

  public constructor(private readonly replica: DataController) {
    super(mainScreen.GunShop);

    this.load();

    this.frame.ToggleButton.Button.Activated.Connect(() => this.exit());
    this.frame.Preview.Buy.Activated.Connect(() => {
      const id = this.selectedID;
      if (!id) return;
      switch (this.currenctAction) {
        case 'Buy':
          Functions.requestBuy(id)
            .then((value) => {
              print(value);
            })
            .catch((err) => {
              warn('BUY FAILED');
              warn(err);
            });
          break;
        case 'Equip':
          Functions.requestGunEquip(id)
            .then((value) => print(value))
            .catch((err) => warn('EQUIP FAILED:', err));
          break;
        default:
          break;
      }
    });
    effect(() => {
      const data = this.selectedData();
      this.update(data);
      this.updatePreviewStatList(this.selectedID);
    });
    this.selected.Connect((id) => {
      if (this.selectedID === id) return;
      this.selectedID = id;
      this.updatePreviewStatList(id);
    });
  }

  private exit(): void {
    this.toggle(false);
  }

  public toggle(on = !this.frame.Visible): void {
    if (this.frame.Visible === on) return;
    this.frame.Visible = on;
    this.toggled.Fire(on);
  }

  public isEnabled(): boolean {
    return this.frame.Visible;
  }

  protected onItemClick(id: string): void {
    print('selected: ' + id);
    this.selected.Fire(id);
  }
}
