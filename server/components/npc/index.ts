import { BaseComponent, Component } from '@flamework/components';
import { OnStart } from '@flamework/core';
import { NpcRegistry } from 'server/game/npc/registry';
import { CharacterRig } from 'shared';
import Chrono from 'rbxts-chrono';
import { Janitor } from '@rbxts/janitor';
import { IncreaseCurrency, PlayerStateService } from 'server/players';
import { HasOwnership } from 'shared/gfs/gfs-utils';
import { IncreaseKills } from 'server/players/kills';

interface Attributes {
  type: string;
  isMoving: boolean;
}
@Component({
  tag: 'ENEMY',
})
export class NpcComponent extends BaseComponent<Attributes, CharacterRig> implements OnStart {
  constructor() {
    super();
  }

  onStart(): void {
    const npc = NpcRegistry[this.attributes.type];
    assert(npc, 'enemy type not found in registry!');
    const entity = new Chrono.Entity(undefined, this.instance);
    const humanoid = this.instance.WaitForChild('Humanoid') as Humanoid;
    npc(this.instance);

    // since chrono disables roblox's property replication i have to do this
    humanoid.Running.Connect((speed) => {
      if (speed > 0) {
        this.attributes.isMoving = true;
      } else this.attributes.isMoving = false;
    });

    this.instance.Destroying.Connect(() => {
      Chrono.Entity.Destroy(entity);
    });

    humanoid.Died.Once(() => {
      const attacker_ownership = HasOwnership(humanoid);
      if (attacker_ownership) {
        const plr = <number>humanoid.GetAttribute('attackedBy');

        this.awardKill(plr, humanoid.MaxHealth / 5);
      }
      task.delay(2, () => {
        Chrono.Entity.Destroy(entity);
      });
    });
  }

  /**
   * Awards the selected player that killed the mob
   * @param plr_id - the player's id.
   * @param amount - the amount you want to give.
   */
  private awardKill(plr_id: number, amount: number) {
    const fixedAmount = math.floor(amount);
    IncreaseCurrency(plr_id, 'money', fixedAmount);
    IncreaseKills(plr_id, 1);
  }
}
