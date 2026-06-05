import { BaseComponent, Component } from '@flamework/components';
import { OnStart } from '@flamework/core';
import { Character } from '@rbxts/wcs';

import { ToolDefinition } from 'shared/tree-definitions';
import knuckleSandwich from 'shared/wcs/movesets';

interface Attributes {
  type: string;
}

@Component({
  tag: 'tool-tag',
})
export class WCSToolMovesetApply<A = Attributes, I extends ToolDefinition = ToolDefinition>
  extends BaseComponent<A, I>
  implements OnStart
{
  private _WCS_Char: Character | undefined;
  onStart(): void {
    this.instance.Equipped.Connect(() => this.apply());
    this.instance.Unequipped.Connect(() => this.clear());
  }

  apply(): void {
    const model = this.instance.FindFirstAncestorOfClass('Model');
    assert(model, `unable to get player character`);
    const WCS_char = Character.GetCharacterFromInstance(model);
    WCS_char?.ApplySkillsFromMoveset(knuckleSandwich);
    this._WCS_Char = WCS_char;
    print('applied skills');
  }

  clear(): void {
    const WCS_char = this._WCS_Char;
    assert(WCS_char, 'unable to get WCS character!');
    WCS_char?.ClearMoveset();
    print('removed skills');
  }
}
