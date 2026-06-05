import { assets } from 'shared/constants';
import { ContentRegistry } from './content-registry';
import { ToolGunDefinition } from 'shared/tree-definitions';

class WeaponRegistryClass extends ContentRegistry {
  public load(): void {
    const items = assets.Weapons.GetChildren() as ToolGunDefinition[];
    for (const item of items) {
      this.register(item);
    }
  }
}

export const WeaponRegistry = new WeaponRegistryClass();
