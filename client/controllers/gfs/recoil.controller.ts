import { Controller, OnStart } from '@flamework/core';
import { createSpring } from '@rbxts/ripple';
import { RunService, Workspace } from '@rbxts/services';
import { GUN_CONSTANTS } from 'shared/gfs/constants';

@Controller()
export class RecoilController implements OnStart {
  private camera = Workspace.CurrentCamera!;
  private recoilMotion = createSpring(Vector2.zero, {
    frequency: 8,
    dampingRatio: 0.6,
    start: true,
  });
  private current = Vector2.zero;
  onStart(): void {
    this.recoilMotion.onChange((value) => {
      this.current = value;
    });
    RunService.BindToRenderStep(
      GUN_CONSTANTS.RECOIL_BIND_NAME,
      Enum.RenderPriority.Camera.Value + 5,
      () => this.onRenderStepped(),
    );
  }

  private onRenderStepped() {
    const base = this.camera.CFrame;
    const rot = this.current;

    this.camera.CFrame = base.mul(CFrame.Angles(math.rad(rot.Y), math.rad(rot.X), 0));
  }

  public recoil(recoilAmount: Vector2) {
    this.recoilMotion.setGoal(Vector2.zero, {
      impulse: recoilAmount.mul(2),
    });
  }
}
