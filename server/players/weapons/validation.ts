import { WeaponRegistry } from 'shared/registry/weapon-registry';

export function validateWeaponID(id: string) {
  return WeaponRegistry.get(id) !== undefined;
}
