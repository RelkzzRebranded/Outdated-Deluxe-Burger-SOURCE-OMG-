import { BaseComponent, Component, ComponentStreamingMode } from '@flamework/components';
import { Flamework, Modding, OnStart } from '@flamework/core';
import { Janitor } from '@rbxts/janitor';
import Object from '@rbxts/object-utils';
import { UserInputService, Workspace } from '@rbxts/services';
import { LocalPlayer } from 'client/constants';
import { CharacterAnimationController } from 'client/controllers/gfs/character-animation.controller';
import { RecoilController } from 'client/controllers/gfs/recoil.controller';
import { VisibleArmsController } from 'client/controllers/gfs/visible-arms.controller';
import { TouchInputController } from 'client/controllers/ui/gun/gunmobile';
import { GunReticleUIController } from 'client/controllers/ui/gun/gunreticle';
import { Events } from 'client/network';
import { ToolGunDefinition } from 'shared';
import { GUN_CONSTANTS } from 'shared/gfs/constants';
import { castRays, drawRayResults, getRayDirections } from 'shared/gfs/gfs-utils/casting';

export interface GunAttributes {
  id: string;
  price: number;
  fireMode: string;
  range: number;
  rateOfFire: number;
  damage: number;
  spread: number;
  rayRadius: number;
  raysPerShot: number;
  recoilMax: Vector2;
  recoilMin: Vector2;
}

const random = new Random();

const camera = Workspace.CurrentCamera!;

@Component({
  tag: 'GUN',
  streamingMode: ComponentStreamingMode.Watching,
})
export class GunComponent
  extends BaseComponent<GunAttributes, ToolGunDefinition>
  implements OnStart
{
  private bin = new Janitor();
  private activated = false;
  private equipped = false;
  private shooting = false;
  private humanoid: Humanoid | undefined;
  private readonly characterAnimation = new CharacterAnimationController(this.instance);
  private readonly touchInputController = new TouchInputController(this.instance);

  constructor(
    private readonly recoiler: RecoilController,
    private readonly visibleArms: VisibleArmsController,
    private readonly gui: GunReticleUIController,
  ) {
    super();
  }

  onStart(): void {
    this.bin.Add(this.instance.Equipped.Connect(() => this.equip()));
    this.bin.Add(this.instance.Unequipped.Connect(() => this.unequip()));
    this.bin.Add(this.instance.Activated.Connect(() => this.activate()));
    this.bin.Add(this.instance.Deactivated.Connect(() => this.deactivate()));
    this.bin.Add(this.characterAnimation, 'destroy');
    this.bin.Add(this.gui, 'destroy');
    this.bin.Add(this.touchInputController, 'destroy');
    this.bin.Add(
      UserInputService.InputBegan.Connect((inputObj, processed) => {
        if (processed) return;

        if (
          inputObj.KeyCode === GUN_CONSTANTS.KEYBOARD_INSPECT_KEY_CODE ||
          inputObj.KeyCode === GUN_CONSTANTS.GAMEPAD_INSPECT_KEY_CODE
        ) {
          this.inspect();
        }
      }),
    );

    this.touchInputController.setInspectCallback(() => this.inspect());
  }

  private isHumanoidAlive(): boolean {
    return this.humanoid! && this.humanoid.Health > 0;
  }

  private canShoot(): boolean {
    return this.isHumanoidAlive() && this.equipped;
  }

  private recoil(): void {
    const recoilMin = this.attributes.recoilMin;
    const recoilMax = this.attributes.recoilMax;

    const xDif = recoilMax.X - recoilMin.X;
    const yDif = recoilMax.Y - recoilMin.Y;
    const x = recoilMin.X + random.NextNumber() * xDif;
    const y = recoilMin.Y + random.NextNumber() * yDif;

    const recoil = new Vector2(-x, y);

    this.recoiler.recoil(recoil);
  }

  private shoot(): void {
    const spread = this.attributes.spread;
    const raysPerShot = this.attributes.raysPerShot;
    const range = this.attributes.range;
    const rayRadius = this.attributes.rayRadius;

    this.characterAnimation.stopInspectAnimation();
    this.characterAnimation.playShootAnimation();
    this.recoil();

    const now = Workspace.GetServerTimeNow();
    const origin = camera.CFrame;

    const rayDirections = getRayDirections(origin, raysPerShot, math.rad(spread), now);
    for (const [index, direction] of Object.entries(rayDirections)) {
      rayDirections[index - 1] = direction.mul(range);
    }

    const rayResults = castRays(LocalPlayer, origin.Position, rayDirections, rayRadius);

    const tagged = new Map<string, Humanoid>();
    let didTag = false;
    for (const [index, rayResult] of Object.entries(rayResults)) {
      if (rayResult.taggedHumanoid) {
        tagged.set(tostring(index), rayResult.taggedHumanoid);
        didTag = true;
      }
    }

    if (didTag) this.gui.showHitmarker();

    Events.shoot.fire(now, this.instance, origin, tagged);

    drawRayResults(this.instance.Handle.MuzzleAttachment.WorldPosition, rayResults);
  }

  private inspect(): void {
    this.characterAnimation.playInspectAnimation();
  }

  private startShooting(): void {
    if (!this.canShoot()) return;
    if (this.shooting) return;
    const fireMode = this.attributes.fireMode;
    const rateOfFire = this.attributes.rateOfFire;

    if (fireMode === GUN_CONSTANTS.FIRE_MODE.SEMI) {
      this.shooting = true;
      this.shoot();
      task.delay(60 / rateOfFire, () => {
        this.shooting = false;
      });
    } else if (fireMode === GUN_CONSTANTS.FIRE_MODE.AUTO) {
      task.spawn(() => {
        this.shooting = true;

        while (this.activated && this.canShoot()) {
          this.shoot();
          task.wait(60 / rateOfFire);
        }
        this.shooting = false;
      });
    }
  }

  private activate(): void {
    if (this.activated) return;
    this.activated = true;
    this.startShooting();
  }

  private deactivate(): void {
    if (!this.activated) return;
    this.activated = false;
  }
  private equip(): void {
    this.equipped = true;

    this.visibleArms.enable();
    this.characterAnimation.enable();

    this.gui.enable();
    this.touchInputController.enable();

    this.humanoid = this.instance.Parent!.FindFirstChildOfClass('Humanoid');
  }
  private unequip(): void {
    if (!this.equipped) return;
    this.equipped = false;
    this.deactivate();
    this.visibleArms.disable();
    this.characterAnimation.disable();
    this.gui.disable();
    this.touchInputController.disable();
  }

  override destroy(): void {
    this.bin.Destroy();
  }
}
