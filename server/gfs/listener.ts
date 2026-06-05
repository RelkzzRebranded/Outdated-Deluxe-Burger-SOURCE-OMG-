/* eslint-disable roblox-ts/lua-truthiness */
import { OnStart, Service } from '@flamework/core';
import { Events } from 'server/network';
import { validateShoot, validateShootArguments, validateTag } from './validation';
import { GunAttributes } from 'client/components/gun.component';
import Object from '@rbxts/object-utils';
import { castRays, getRayDirections } from 'shared/gfs/gfs-utils/casting';
import { ApplyAttackerOwnership } from 'shared/gfs/gfs-utils';
import { ShotReplication } from 'shared/gfs/replication/shot-replication';
import { Players } from '@rbxts/services';
import { IncreaseCurrency } from 'server/players';
import { toFixed } from 'shared';

@Service({})
export class GFSEventListener implements OnStart {
  onStart(): void {
    Events.shoot.connect((player, timestamp, gun, origin, tagged) => {
      if (!validateShootArguments(timestamp, gun, origin, tagged)) return;
      if (!validateShoot(player, timestamp, gun, origin)) return;

      const attributes = gun.GetAttributes() as Map<
        keyof GunAttributes,
        GunAttributes[keyof GunAttributes]
      >;
      const spread = <number>attributes.get('spread');
      const raysPerShot = <number>attributes.get('raysPerShot');
      const range = <number>attributes.get('range');
      const rayRadius = <number>attributes.get('rayRadius');
      const damage = <number>attributes.get('damage');

      const spreadAngle = math.rad(spread);
      const rayDirections = getRayDirections(origin, raysPerShot, spreadAngle, timestamp);
      for (const [index, direction] of Object.entries(rayDirections)) {
        rayDirections[index - 1] = direction.mul(range);
      }

      const rayResults = castRays(player, origin.Position, rayDirections, rayRadius, true);

      for (const [indexString, taggedHumanoid] of tagged) {
        const index = tonumber(indexString);
        if (!index) continue;
        const rayResult = rayResults[index - 1];
        if (!rayResults[index - 1]) continue;
        const rayDirection = rayDirections[index - 1];
        if (!rayDirection) continue;

        if (!validateTag(player, taggedHumanoid, origin.Position, rayDirection, rayResult))
          continue;

        rayResult.taggedHumanoid = taggedHumanoid;

        const model = taggedHumanoid.FindFirstAncestorOfClass('Model');
        if (model) {
          const modelPosition = model.GetPivot().Position;
          const distance = modelPosition.sub(origin.Position).Magnitude;
          rayResult.position = origin.Position.add(rayDirection.Unit).mul(distance);
        }

        if (taggedHumanoid.Health <= 0) continue;

        this.Damage(player, taggedHumanoid, damage);
      }

      new ShotReplication(gun, origin.Position, rayResults).Start(
        Players.GetPlayers().filter((otherplr) => otherplr !== player),
      );
    });
  }
  /**
   * Damages selected Character with the attackers character
   * also has a default param called `applyOwnership` where its enabled by default, it sets the ownership of the victim by the attacker.
   * @param plr - self
   * @param wcs_character - victim
   * @param damage - amount
   * @param applyOwnership - for validating kills
   */
  private Damage(plr: Player, victim_humanoid: Humanoid, damage: number, applyOwnership = true) {
    const humanoid = victim_humanoid;
    humanoid.TakeDamage(damage);
    const HitMoney = math.min(50, toFixed(math.log10(damage) * 5, 0));
    IncreaseCurrency(plr.UserId, 'money', HitMoney);
    if (applyOwnership) ApplyAttackerOwnership(plr, victim_humanoid);
  }
}
