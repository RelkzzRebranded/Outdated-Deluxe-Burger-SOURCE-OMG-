import { Controller, OnStart } from '@flamework/core';
import { LocalPlayer } from 'client/constants';
import { OnCharacterAdd, OnCharacterRemove } from 'client/hooks';

@Controller()
export class CharacterHookController implements OnStart {
  public onStart(): void {
    const addListeners = new Set<OnCharacterAdd>();
    const removeListeners = new Set<OnCharacterRemove>();

    const player = LocalPlayer;
    player.CharacterAdded.Connect((character) => {
      character.WaitForChild('Humanoid');
      for (const obj of addListeners) task.spawn(() => obj.onCharacterAdd(character as never));
    });
    player.CharacterRemoving.Connect((character) => {
      for (const obj of removeListeners)
        task.spawn(() => obj.onCharacterRemove(character as never));
    });

    const existingCharacter = player.Character;
    if (existingCharacter)
      for (const obj of addListeners)
        task.spawn(() => obj.onCharacterAdd(existingCharacter as never));
  }
}
