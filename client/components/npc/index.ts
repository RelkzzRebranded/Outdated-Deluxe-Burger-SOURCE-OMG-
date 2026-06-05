import { BaseComponent, Component } from '@flamework/components';
import { OnStart, OnTick } from '@flamework/core';
import { CharacterRig } from 'shared';
import { Janitor } from '@rbxts/janitor';
import { NPCAnimationController } from 'client/controllers/game/npc-animation';
import { Signal } from '@rbxts/beacon';

interface Attributes {
  type: string;
  isMoving: boolean;
}
@Component({
  tag: 'ENEMY',
})

/**
 * CLIENT ENEMY-NPC HANDLER
 * - Handles Animations (for now)
 */
export class NpcComponent extends BaseComponent<Attributes, CharacterRig> implements OnStart {
  private bin = new Janitor();
  public readonly npcAnimation = new NPCAnimationController(this.instance);
  private humanoid = this.instance.Humanoid;

  constructor() {
    super();
  }

  onStart(): void {
    this.npcAnimation.enable();
    this.onAttributeChanged('isMoving', (isMoving, _o) => {
      const speed = 16 / this.humanoid.WalkSpeed;
      if (isMoving) {
        print(this.npcAnimation.animationTracks.get('Walking'));
        this.npcAnimation.animationTracks.get('Walking')?.Play(0.1, speed);
      } else this.npcAnimation.animationTracks.get('Walking')?.Stop();
    });

    this.bin.Add(this.npcAnimation, 'destroy');
  }

  override destroy(): void {
    this.bin.Destroy();
  }
}
