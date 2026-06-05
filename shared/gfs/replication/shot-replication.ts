import { BaseEffect, VisualEffectDecorator } from '@rbxts/refx';
import { drawRayResults, RayResult } from '../gfs-utils/casting';
import { ToolGunDefinition } from 'shared/tree-definitions';
import pvfx from 'shared/pvfx';

@VisualEffectDecorator
export class ShotReplication extends BaseEffect<
  [gun: ToolGunDefinition, position: Vector3, rayResults: RayResult[]]
> {
  public override OnStart(
    gun: ToolGunDefinition,
    position: Vector3,
    rayResults: RayResult[],
  ): void {
    if (gun && gun.IsDescendantOf(game)) {
      const handle = gun.Handle;
      const muzzle = <ToolGunDefinition['Handle']['MuzzleAttachment']>(
        handle.FindFirstChild('MuzzleAttachment')
      );
      if (muzzle) {
        position = muzzle.WorldPosition;
        pvfx.emit(muzzle);
      } else position = gun.GetPivot().Position;
    }
    drawRayResults(position, rayResults);
  }
}
