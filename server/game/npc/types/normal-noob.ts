import { Blackboard, BTree } from '@rbxts/state-management';
import { CharacterRig } from 'shared';
import { RunService, Workspace } from '@rbxts/services';
import { noob_tree_root } from '../b-trees';

export function NormalNoob(model: CharacterRig) {
  const humanoid = model.WaitForChild('Humanoid') as Humanoid;
  const blackBoard = new Blackboard({
    model: model,
    base: Workspace.FindFirstChild('Base') as Part,
    attackRange: 3,
    damage: 5,
    inRange: false,
  });
  let tree = new BTree.BehaviorTree(noob_tree_root(), blackBoard);
  let c0 = RunService.PostSimulation.Connect((dt) => {
    tree.Tick(dt);
  });
  model.Destroying.Once(() => {
    humanoid.Died.Once(() => {
      c0.Disconnect();
      tree.Halt();
      tree = undefined!;
      c0 = undefined!;
    });
  });

  humanoid.Died.Once(() => {
    c0.Disconnect();
    tree.Halt();
    tree = undefined!;
    c0 = undefined!;
  });
}
