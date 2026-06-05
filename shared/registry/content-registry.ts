import { Registry } from './registry';

export abstract class ContentRegistry extends Registry {
  protected readonly content = new Map<string, Model | Tool>();
  protected readonly byName = new Map<string, string>();

  public getAll(): Model[] | Tool[] {
    return [...this.content].map(([_, content]) => content);
  }

  public getAllIDs(): string[] {
    return [...this.content].map(([id]) => id);
  }

  public register(item: Model | Tool): void {
    const id = <string>item.GetAttribute('id')!;
    this.content.set(id, item);
    this.byName.set(item.Name, id);
  }

  public get<T extends Model | Tool = Model | Tool>(id: string): T {
    return this.content.get(id) as T;
  }

  public getByName(name: string): Model | Tool {
    return this.get(this.byName.get(name)!);
  }
}
