import { Components } from '@flamework/components';
import { Dependency } from '@flamework/core';
import { Players } from '@rbxts/services';
import { BTree } from '@rbxts/state-management';
import { GameBaseComponent } from 'server/components/base';
import { CharacterRig } from 'shared';
import { NPCAnimationReplication } from 'shared/npc/replication';

// IMPORTANT:
// Behavior tree nodes store runtime state (Cooldowns, Running status, etc).
// Do NOT create these globally or multiple NPCs will share the same node state.
// Every NPC must receive a fresh tree instance.
// Please bro read this, im paving the way for new people that are using b-trees.
export const noob_tree_root = () => {
  const attackSequence = new BTree.Sequence()
    .AddChild(new BTree.Condition((bb) => bb.Get('inRange' as never) === true))
    .AddChild(
      new BTree.Cooldown(
        new BTree.Action((bb) => {
          const character = bb.Get('model' as never) as CharacterRig;
          const base = bb.Get('base' as never) as Part;
          const BaseComponent = Dependency<Components>().getComponent<GameBaseComponent>(base);
          character.Humanoid.MoveTo(character.HumanoidRootPart.Position);
          new NPCAnimationReplication(character, 'Attack').Start(Players.GetPlayers());
          BaseComponent?.decreaseHealth(bb.Get('damage' as never));
          return BTree.ENodeStatus.SUCCESS;
        }),
        3,
      ),
    );

  const walkToBaseSequence = new BTree.Sequence()
    .AddChild(new BTree.Condition((bb) => bb.Get('inRange' as never) === false))
    .AddChild(
      new BTree.Action((bb) => {
        const character = bb.Get('model' as never) as CharacterRig;
        const base = <Part>bb.Get(<never>'base');
        character.HumanoidRootPart.Anchored = false;
        character.Humanoid.MoveTo(base.Position);
        return BTree.ENodeStatus.SUCCESS;
      }),
    );

  return new BTree.Fallback()
    .AddChild(attackSequence)
    .AddChild(
      new BTree.Action((bb) => {
        const character = bb.Get('model' as never) as CharacterRig;
        const base = bb.Get('base' as never) as Part;
        const dist = character.HumanoidRootPart.Position.sub(base.Position).Magnitude;
        const inRange = dist <= bb.Get('attackRange' as never);
        bb.Set('inRange' as never, inRange as never);
        return inRange ? BTree.ENodeStatus.SUCCESS : BTree.ENodeStatus.FAILURE;
      }),
    )
    .AddChild(walkToBaseSequence);
};
