import { Controller, OnStart } from '@flamework/core';
import { Signal } from '@rbxts/beacon';
import { UserInputService } from '@rbxts/services';

const InputCategory = {
  KeyboardAndMouse: 'KeyboardAndMouse',
  Gamepad: 'Gamepad',
  Touch: 'Touch',
  Unknown: 'Unknown',
};

@Controller({})
export class InputCategorizerController implements OnStart {
  public InputCategory = InputCategory;
  public lastInputCategoryChangedEvent = new Signal<[string]>();
  private _lastInputCategory = InputCategory.Unknown;
  onStart(): void {
    UserInputService.LastInputTypeChanged.Connect((inputType) =>
      this._onInputTypeChanged(inputType),
    );

    const defaultInputCategory = this._getDefaultInputCategory();
    print(defaultInputCategory);
    this._setLastInputCategory(defaultInputCategory);
  }
  public getLastInputCategory(): string {
    return this._lastInputCategory;
  }

  private _setLastInputCategory(inputCategory: string) {
    if (this._lastInputCategory !== inputCategory) {
      this._lastInputCategory = inputCategory;
      this.lastInputCategoryChangedEvent.Fire(inputCategory);
    }
  }

  private _getCategoryOfInputType(inputType: Enum.UserInputType) {
    switch (true) {
      case inputType.Name.find('Gamepad')[0] !== undefined:
        return InputCategory.Gamepad;
      case inputType === Enum.UserInputType.Keyboard ||
        inputType.Name.find('Mouse')[0] !== undefined:
        return InputCategory.KeyboardAndMouse;
      case inputType === Enum.UserInputType.Touch:
        return InputCategory.Touch;
      default:
        return InputCategory.Unknown;
    }
  }

  private _onInputTypeChanged(inputType: Enum.UserInputType): void {
    const inputCategory = this._getCategoryOfInputType(inputType);
    if (inputCategory !== InputCategory.Unknown) this._setLastInputCategory(inputCategory);
  }

  private _getDefaultInputCategory(): string {
    const lastInputType = UserInputService.GetLastInputType();
    const lastInputCategory = this._getCategoryOfInputType(lastInputType);

    if (lastInputCategory !== InputCategory.Unknown) return lastInputCategory;

    switch (true) {
      case UserInputService.KeyboardEnabled && UserInputService.MouseEnabled:
        return InputCategory.KeyboardAndMouse;
      case UserInputService.TouchEnabled:
        return InputCategory.Touch;
      case UserInputService.GamepadEnabled:
        return InputCategory.Gamepad;
      default:
        return InputCategory.Unknown;
    }
  }
}
