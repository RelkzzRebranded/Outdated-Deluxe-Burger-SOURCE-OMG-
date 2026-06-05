import { ReplicatedStorage, TweenService, Workspace } from '@rbxts/services';

const laserBeamTemplate = ReplicatedStorage.Objects.LaserBeam;
export function gunBeamEffect(startPosition: Vector3, endPosition: Vector3) {
  const distance = startPosition.sub(endPosition).Magnitude;
  const tweenTime = distance / 900;
  const tweenInfo = new TweenInfo(tweenTime, Enum.EasingStyle.Linear, Enum.EasingDirection.Out);

  const laser = laserBeamTemplate.Clone();
  laser.CFrame = CFrame.lookAt(startPosition, endPosition);
  laser.StartAttachment.Position = Vector3.zero;
  laser.EndAttachment.Position = new Vector3(0, 0, -distance);
  laser.Parent = Workspace.Ignore;

  const tween = TweenService.Create(laser.StartAttachment, tweenInfo, {
    Position: laser.EndAttachment.Position,
  });
  tween.Play();
  tween.Completed.Once(() => laser.Destroy());
}
