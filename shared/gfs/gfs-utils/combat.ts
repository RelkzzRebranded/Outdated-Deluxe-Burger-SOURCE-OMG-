import { CharacterRig } from 'shared/tree-definitions';

export function ApplyAttackerOwnership(plr: Player, victim_humanoid: Humanoid) {
  const humanoid = victim_humanoid;
  if (HasOwnership(victim_humanoid)) return;
  humanoid.SetAttribute('attackedBy', plr.UserId);
}

/**
 * Validates if the Victim's Character was attacked by a player with its player id inside the attribute's value
 * @param victim_character - Character Model
 * @returns true or false
 */
export function HasOwnership(victim_humanoid: Humanoid) {
  const attribute = victim_humanoid.GetAttribute('attackedBy');
  return attribute !== undefined && typeIs(attribute, 'number');
}

export function canPlayerDamageHumanoid(taggedHumanoid: Humanoid): boolean {
  if (taggedHumanoid.Health <= 0) return false;

  const taggedCharacter = taggedHumanoid.Parent as CharacterRig;

  return taggedCharacter !== undefined && taggedCharacter.HasTag('ENEMY');
}
