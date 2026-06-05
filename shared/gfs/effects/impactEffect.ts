import { ReplicatedStorage, Workspace } from '@rbxts/services';
import pvfx from 'shared/pvfx';

const environmentImpactTemplate = ReplicatedStorage.Objects.EnvironmentImpact;
const characterImpactTemplate = ReplicatedStorage.Objects.CharacterImpact;

export function impactEffect(position: Vector3, normal: Vector3, isCharacter: boolean) {
  let impact: typeof environmentImpactTemplate | typeof characterImpactTemplate;
  if (isCharacter) {
    impact = characterImpactTemplate.Clone();
    impact.CFrame = CFrame.lookAlong(position, normal);
    impact.Parent = Workspace.Ignore;

    pvfx.emit(impact.SparkEmitter, { Count: 10 });
  } else {
    impact = environmentImpactTemplate.Clone();
    impact.CFrame = CFrame.lookAlong(position, normal);
    impact.Parent = Workspace.Ignore;

    pvfx.emit(impact.SparkEmitter, { Count: 10 });
  }
  task.delay(0.5, () => impact.Destroy());
}
