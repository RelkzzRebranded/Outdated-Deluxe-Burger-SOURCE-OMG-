import { OnStart, Service } from '@flamework/core';
import { Players } from '@rbxts/services';
import { GUN_CONSTANTS } from 'shared/gfs/constants';

@Service({})
export class AccessoryFilterService implements OnStart {
  onStart(): void {
    for (const player of Players.GetPlayers()) {
      task.spawn(() => this.onPlayerAdded(player));
    }

    Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player));
  }

  private tagPart(part: BasePart): void {
    part.AddTag(GUN_CONSTANTS.NON_STATIC_TAG);

    const accessory = part.FindFirstChildOfClass('Accessory');
    const tool = part.FindFirstChildWhichIsA('Tool');
    if (accessory || tool) part.AddTag(GUN_CONSTANTS.RAY_EXCLUDE_TAG);
  }

  private onCharacterAdded(character: Model): void {
    const player = Players.GetPlayerFromCharacter(character);
    if (!player) return;

    character.DescendantAdded.Connect((instance: Instance) => {
      if (instance.IsA('BasePart')) this.tagPart(instance);
    });

    for (const instance of character.GetDescendants()) {
      if (instance.IsA('BasePart')) this.tagPart(instance);
    }
  }

  private onPlayerAdded(player: Player): void {
    player.CharacterAdded.Connect((character) => this.onCharacterAdded(character));

    if (player.Character) this.onCharacterAdded(player.Character);
  }
}
