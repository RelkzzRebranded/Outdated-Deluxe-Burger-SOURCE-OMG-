import { Workspace } from '@rbxts/services';
import { canPlayerDamageHumanoid } from 'shared/gfs/gfs-utils';
import { RayResult } from 'shared/gfs/gfs-utils/casting';
import {
  validateCFrame,
  validateInstance,
  validateNumber,
  validateSimpleTable,
} from 'shared/gfs/validation';

const TIMESTAMP_BUFFER_CONSTANT = 1;
const POSITION_BUFFER_CONSTANT = 5;
const POSITION_BUFFER_FACTOR = 0.4;
const DIRECTION_BUFFER_CONSTANT = 10;
const WALL_DISTANCE_BUFFER_CONSTANT = 5;

const taggedValidator = (instance: any): boolean => {
  return validateInstance(instance, 'Humanoid');
};

export function validateShootArguments(
  timestamp: number,
  gun: Tool,
  origin: CFrame,
  tagged: Map<string, Humanoid>,
) {
  if (!validateNumber(timestamp)) return false;
  if (!validateInstance(gun, 'Tool')) return false;
  if (!validateCFrame(origin)) return false;
  if (!validateSimpleTable(tagged, 'string', taggedValidator)) return false;
  return true;
}

export function validateShoot(
  player: Player,
  timestamp: number,
  gun: Tool,
  origin: CFrame,
): boolean {
  const now = Workspace.GetServerTimeNow();
  if (timestamp > now) return false;
  if (timestamp < now - TIMESTAMP_BUFFER_CONSTANT) return false;

  const character = player.Character;
  if (!character) return false;
  const humanoid = character.FindFirstChildOfClass('Humanoid');
  if (!humanoid) return false;
  if (humanoid.Health <= 0) return false;
  const primaryPart = character.PrimaryPart;
  if (!primaryPart) return false;
  if (gun.Parent !== character) return false;

  const distance = primaryPart.Position.sub(origin.Position).Magnitude;
  const maxDistance =
    POSITION_BUFFER_CONSTANT +
    primaryPart.AssemblyLinearVelocity.Magnitude * POSITION_BUFFER_FACTOR;
  if (distance > maxDistance) return false;

  return true;
}

export function validateTag(
  player: Player,
  taggedHumanoid: Humanoid,
  position: Vector3,
  direction: Vector3,
  rayResult: RayResult,
): boolean {
  if (!canPlayerDamageHumanoid(taggedHumanoid)) return false;
  const character = taggedHumanoid.FindFirstAncestorOfClass('Model');
  if (!character) return false;

  const pivot = character.GetPivot();
  const characterOffset = pivot.Position.sub(position);
  const characterDistance = characterOffset.Magnitude;
  const rayDistance = position.sub(rayResult.position).Magnitude;

  if (rayDistance < characterDistance - WALL_DISTANCE_BUFFER_CONSTANT) return false;
  const maxAngle = math.atan(DIRECTION_BUFFER_CONSTANT / characterDistance);
  const angle = characterOffset.Angle(direction);
  if (angle > maxAngle) return false;

  return true;
}
