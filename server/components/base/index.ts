import { BaseComponent, Component } from '@flamework/components';
import { OnStart } from '@flamework/core';
import { Janitor } from '@rbxts/janitor';
import Object from '@rbxts/object-utils';
import { GameManager } from 'shared/game';

interface attributes {
  HEALTH: number;
  MAX_HEALTH: number;
}

@Component({
  tag: 'BASE',
})
export class GameBaseComponent extends BaseComponent<attributes, Part> implements OnStart {
  private bin = new Janitor<{ instances: Instance }>();
  onStart(): void {
    print('[BASE COMPONENT]: INITIALIZED');
    for (const [key, val] of Object.entries(this.attributes)) {
      print(key, val);
    }
    this.onAttributeChanged('HEALTH', (n) => {
      if (n <= 0) {
        print('GAME OVER');
        GameManager.updateState((state) => {
          state.phase = 'game_over';
        });
      }
    });
    this.bin.Add(this.instance, 'Destroy');
  }

  public increaseHealth(amount: number): void {
    this.attributes.HEALTH = math.clamp(
      this.attributes.HEALTH + amount,
      0,
      this.attributes.MAX_HEALTH,
    );
    // print(`INCREASED BASE HP: ${this.attributes.HEALTH}`);
  }

  public decreaseHealth(amount: number): void {
    this.attributes.HEALTH = math.clamp(
      this.attributes.HEALTH - amount,
      0,
      this.attributes.MAX_HEALTH,
    );
    // print(`DECREASED BASE HP: ${this.attributes.HEALTH}`);
  }

  destroy(): void {
    this.bin.Cleanup();
  }
}
