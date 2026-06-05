// i love and i fucking hate mobile support at the same time

import { Controller, Dependency } from '@flamework/core';
import { Janitor } from '@rbxts/janitor';
import { UserInputService } from '@rbxts/services';
import { mainScreen } from 'client/constants';
import { InputCategorizerController } from 'client/controllers/gfs/input-categorizer.controller';
import { ToolGunDefinition } from 'shared';
import { GUN_CONSTANTS } from 'shared/gfs/constants';

export class TouchInputController {
  private gui = mainScreen.Gameplay.GunTouch;
  private enabled = false;
  private bin = new Janitor();
  private inspectCallback!: () => void | undefined;
  private shootInputObject: InputObject | undefined;
  private readonly inputCategorizer = Dependency<InputCategorizerController>();
  protected gun;

  constructor(gun: ToolGunDefinition) {
    this.gun = gun;
    print('[MOBILE CONTROLS]: ENABLED');
  }

  private updateScale(): void {
    const minScreenSize = math.min(this.gui.AbsoluteSize.X, this.gui.AbsoluteSize.Y);
    const isSmallScreen = minScreenSize < GUN_CONSTANTS.UI_SMALL_SCREEN_THRESHOLD;
    this.gui.Buttons.UIScale.Scale = isSmallScreen ? GUN_CONSTANTS.UI_SMALL_SCREEN_SCALE : 1;
  }

  private enableTouchInput(): void {
    this.gui.Visible = true;
    this.gun.ManualActivationOnly = true;
  }

  private disableTouchInput(): void {
    this.gui.Visible = false;
    this.gun.ManualActivationOnly = false;
  }

  public onInspectButtonInput(inputObject: InputObject): void {
    if (inputObject.UserInputType !== Enum.UserInputType.Touch) return;

    if (this.inspectCallback) this.inspectCallback();
  }

  public onShootButtonInput(inputObject: InputObject): void {
    if (inputObject.UserInputType !== Enum.UserInputType.Touch) return;

    this.shootInputObject = inputObject;
    this.gun.Activate();
  }

  private onInputEnded(inputObject: InputObject): void {
    if (this.shootInputObject === inputObject) {
      this.shootInputObject = undefined;
      this.gun.Deactivate();
    }
  }

  public setInspectCallback(callback: () => void): void {
    this.inspectCallback = callback;
  }

  public enable(): void {
    if (this.enabled) return;

    this.enabled = true;

    this.bin.Add(
      this.inputCategorizer.lastInputCategoryChangedEvent.Connect((lastInputCategory) =>
        this.onLastInputCategoryChanged(lastInputCategory),
      ),
    );

    this.bin.Add(
      this.gui.GetPropertyChangedSignal('AbsoluteSize').Connect(() => this.updateScale()),
    );

    this.bin.Add(
      this.gui.Buttons.ShootButton.InputBegan.Connect((inputObject) => {
        if (inputObject.UserInputState === Enum.UserInputState.Change) return;

        this.onShootButtonInput(inputObject);
      }),
    );

    this.bin.Add(
      this.gui.Buttons.InspectButton.InputBegan.Connect((inputObject) => {
        if (inputObject.UserInputState === Enum.UserInputState.Change) return;

        this.onInspectButtonInput(inputObject);
      }),
    );

    this.bin.Add(
      UserInputService.InputEnded.Connect((inputObject) => {
        this.onInputEnded(inputObject);
      }),
    );

    const lastInputCategory = this.inputCategorizer.getLastInputCategory();
    this.onLastInputCategoryChanged(lastInputCategory);
    this.updateScale();
  }

  public disable(): void {
    if (!this.enabled) return;

    this.enabled = false;
    this.disableTouchInput();
    this.bin.Cleanup();
  }

  private onLastInputCategoryChanged(lastInputCategory: string): void {
    if (lastInputCategory === this.inputCategorizer.InputCategory.Touch) {
      this.enableTouchInput();
    } else this.disableTouchInput();
  }

  public destroy(): void {
    this.disable();
    this.gui.Visible = false;
  }
}
