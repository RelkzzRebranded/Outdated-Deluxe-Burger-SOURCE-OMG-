import { CollectionService, Workspace } from '@rbxts/services';
import { GUN_CONSTANTS } from '../constants';
import { canPlayerDamageHumanoid } from './combat';
import Object from '@rbxts/object-utils';
import { gunBeamEffect } from '../effects/beamEffect';
import { impactEffect } from '../effects/impactEffect';

export type RayResult = {
  taggedHumanoid: Humanoid | undefined;
  position: Vector3;
  normal: Vector3;
  instance: Instance | undefined;
};

export function castRays(
  player: Player,
  position: Vector3,
  directions: Vector3[],
  radius: number,
  staticOnly = false,
): RayResult[] {
  const exclude = CollectionService.GetTagged(GUN_CONSTANTS.RAY_EXCLUDE_TAG);
  if (staticOnly) {
    const nonStatic = CollectionService.GetTagged(GUN_CONSTANTS.NON_STATIC_TAG);
    nonStatic.move(1, nonStatic.size(), exclude.size() + 1, exclude);
  }

  if (player.Character) {
    exclude.push(player.Character);
  }

  const collisionGroup = 'Player';

  const params = new RaycastParams();
  params.FilterType = Enum.RaycastFilterType.Exclude;
  params.IgnoreWater = true;
  params.FilterDescendantsInstances = exclude;
  params.CollisionGroup = collisionGroup;

  const rayResults = <RayResult[]>[];

  for (const direction of directions) {
    const raycastResult = Workspace.Spherecast(position, radius, direction, params);
    const rayResult: RayResult = {
      position: position.add(direction),
      normal: direction.Unit,
      taggedHumanoid: undefined,
      instance: undefined,
    };
    if (raycastResult) {
      rayResult.position = raycastResult.Position;
      rayResult.normal = raycastResult.Normal;
      rayResult.instance = raycastResult.Instance;

      const humanoid = raycastResult.Instance.Parent?.FindFirstChildOfClass('Humanoid');
      if (humanoid && canPlayerDamageHumanoid(humanoid)) rayResult.taggedHumanoid = humanoid;
    }
    rayResults.push(rayResult);
  }

  return rayResults;
}

export function getRayDirections(
  origin: CFrame,
  numberOfRays: number,
  spreadAngle: number,
  seed: number,
): Vector3[] {
  const random = new Random(seed * 100_000);
  const rays = <Vector3[]>[];
  for (let _ = 0; _ < numberOfRays; _++) {
    const roll = random.NextNumber() * math.pi * 2;
    const pitch = random.NextNumber() * spreadAngle;

    const rayCFrame = origin.mul(CFrame.Angles(0, 0, roll)).mul(CFrame.Angles(pitch, 0, 0));
    rays.push(rayCFrame.LookVector);
  }

  return rays;
}

export function drawRayResults(position: Vector3, rayResults: RayResult[]) {
  for (const rayResult of Object.values(rayResults)) {
    gunBeamEffect(position, rayResult.position);

    if (rayResult.instance)
      impactEffect(rayResult.position, rayResult.normal, rayResult.taggedHumanoid !== undefined);
  }
}
