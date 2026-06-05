import { Controller, OnStart } from '@flamework/core';
import { RunService } from '@rbxts/services';
import { MainCharacterController } from 'client/player/character/character-controller';
import { GUN_CONSTANTS } from 'shared/gfs/constants';

@Controller({})
export class VisibleArmsController implements OnStart {
  private enabled = false;
  constructor(private readonly character: MainCharacterController) {}

  onStart(): void {
    RunService.BindToRenderStep(
      GUN_CONSTANTS.VISIBLE_ARMS_BIND_NAME,
      Enum.RenderPriority.Character.Value - 1,
      () => this.onRenderStepped(),
    );
  }

  private onRenderStepped(): void {
    if (!this.enabled) return;
    const character = this.character.getCurrentCharacter();
    const rightArm = <BasePart>character?.FindFirstChild('Right Arm');
    const leftArm = <BasePart>character?.FindFirstChild('Left Arm');
    if (!rightArm && !leftArm) return;
    rightArm.LocalTransparencyModifier = 0;
    leftArm.LocalTransparencyModifier = 0;
  }

  public enable(): void {
    if (this.enabled) return;
    this.enabled = true;
  }
  public disable(): void {
    if (!this.enabled) return;
    this.enabled = false;
  }
}
