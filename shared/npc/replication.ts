import { Components } from '@flamework/components';
import { Dependency } from '@flamework/core';
import { BaseEffect, VisualEffectDecorator } from '@rbxts/refx';
import { Workspace } from '@rbxts/services';
import { NpcComponent } from 'client/components/npc';
import { CharacterRig } from 'shared/tree-definitions';

@VisualEffectDecorator
export class NPCAnimationReplication extends BaseEffect<[npc: CharacterRig, name: string]> {
  public override OnStart(npc: CharacterRig, name: string): void {
    if (npc && npc.IsDescendantOf(Workspace.ENEMIES)) {
      const component = Dependency<Components>().getComponent<NpcComponent>(npc);
      const chosen = component?.npcAnimation.animationTracks.get(name);
      if (chosen) chosen.Play();
    }
  }
}
