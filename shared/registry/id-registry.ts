import { Registry } from './registry';
import { WeaponRegistry } from './weapon-registry';

export class IDRegistryClass extends Registry {
  private ids: string[] = [];

  public getIndex(id: string): number {
    return this.ids.indexOf(id);
  }

  public getID(index: number): string {
    const id = this.ids[index];
    assert(
      id !== undefined,
      'failed to get ID from registry by index: index ' + index + 'does not exist',
    );
    return id;
  }

  public load(): void {
    WeaponRegistry.load();
    const weapons = WeaponRegistry.getAllIDs();
    this.ids = [...weapons].sort();
  }
}

export const IDRegistry = new IDRegistryClass();
IDRegistry.load();
