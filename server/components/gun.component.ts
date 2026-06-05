import { BaseComponent, Component, ComponentStreamingMode } from '@flamework/components';
import { OnStart } from '@flamework/core';
import { Janitor } from '@rbxts/janitor';
import { ToolGunDefinition } from 'shared';

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

@Component({
  tag: 'GUN',
  streamingMode: ComponentStreamingMode.Watching,
})
export class GunComponent
  extends BaseComponent<GunAttributes, ToolGunDefinition>
  implements OnStart
{
  private equipped = false;
  private bin = new Janitor();
  private motor6d = this.bin.Add(new Instance('Motor6D'));

  onStart(): void {
    this.instance.Handle.Transparency = 1;
    this.motor6d.Parent = this.instance.Handle;
    this.bin.Add(this.instance.Equipped.Connect(() => this.equip()));
    this.bin.Add(this.instance.Unequipped.Connect(() => this.unequip()));
  }

  private weld(): void {
    if (!this.equipped) return;
    const arm =
      this.instance.Parent && this.instance.Parent.IsA('Model')
        ? <BasePart>this.instance.Parent.FindFirstChild('Right Arm')
        : undefined;
    this.motor6d.Part0 = arm;
    this.motor6d.Part1 = this.instance.Handle;
    arm?.FindFirstChild('RightGrip')?.Destroy();
  }
  private unweld(): void {
    if (this.equipped) return;
    this.motor6d.Part0 = undefined;
    this.motor6d.Part1 = undefined;
  }

  private equip(): void {
    this.equipped = true;
    this.weld();
  }
  private unequip(): void {
    if (!this.equipped) return;
    this.equipped = false;
    this.unweld();
  }

  override destroy(): void {
    this.bin.Destroy();
  }
}
