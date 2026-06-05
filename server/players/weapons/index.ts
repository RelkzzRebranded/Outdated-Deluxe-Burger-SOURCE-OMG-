import { OnStart, Service } from '@flamework/core';
import { Functions } from 'server/network';
import { validateWeaponID } from './validation';
import { DataManager } from 'shared';
import { WeaponRegistry } from 'shared/registry/weapon-registry';
import { CollectionService } from '@rbxts/services';
import { PlayerStateService } from '../state';
import { DecreaseCurrency } from '../currency';

@Service({})
export class PlayerWeaponService implements OnStart {
  constructor(private readonly state: PlayerStateService) {}

  public onStart(): void {
    this.state.onPlayerAdded((plr) => {
      this.equipWeapon(plr, DataManager.getData(plr.UserId).profile.equippedGun);
      plr.CharacterAdded.Connect(() =>
        this.equipWeapon(plr, DataManager.getData(plr.UserId).profile.equippedGun),
      );
    });
    Functions.requestBuy.setCallback((plr, id) => this.processBuy(plr, id));
    Functions.requestGunEquip.setCallback((plr, id) => this.equipWeapon(plr, id));
  }

  private processBuy(plr: Player, id: string): boolean {
    const item = <Tool>WeaponRegistry.get(id);
    const data = DataManager.getData(plr.UserId);
    if (!validateWeaponID(id)) return false;
    if (data.profile.cash < <number>item.GetAttribute('price')) return false;
    if (data.profile.ownedGuns.has(id)) return false;

    this.addWeaponIDToData(plr, id);
    this.equipWeapon(plr, id);
    DecreaseCurrency(plr.UserId, 'money', <number>item.GetAttribute('price'));
    return true;
  }

  private addWeaponIDToData(plr: Player, id: string): void {
    DataManager.updateData(plr.UserId, (data) => {
      if (data.profile.ownedGuns.has(id)) return;
      data.profile.ownedGuns.set(id, true);
    });
  }

  /**
   * This is where the weapon id is used to get the weapon tool and clone to the players backpack
   * It will also clean up any tool that has the tag 'GUN' to prevent any duplicated tools
   * @param plr player
   * @param id weapon id from the weapon registry
   */
  private equipWeapon(plr: Player, id: string): boolean {
    if (!validateWeaponID(id)) return false;
    const backpack = plr.WaitForChild('Backpack') as Backpack;
    const item = <Tool>WeaponRegistry.get(id).Clone();

    // clean-up
    for (const tool of CollectionService.GetTagged('GUN').filter(
      (obj) => obj.Parent === backpack || obj.Parent === plr.Character,
    ))
      tool.Destroy();

    item.Parent = backpack;
    DataManager.updateData(plr.UserId, (data) => (data.profile.equippedGun = id));
    return true;
  }
}
