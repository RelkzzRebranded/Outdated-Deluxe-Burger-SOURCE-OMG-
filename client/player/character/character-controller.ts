import { Controller, OnStart } from '@flamework/core';
import { Signal } from '@rbxts/beacon';
import { promiseTree } from '@rbxts/validate-tree';
import { LocalPlayer } from 'client/constants';
import { onCharacterAdded, CHARACTER_LOAD_TIMEOUT, CharacterRig, characterSchema } from 'shared';

@Controller({})
export class MainCharacterController implements OnStart {
  private currentCharacter?: CharacterRig;

  public readonly onCharacterAdded = new Signal<[character: CharacterRig]>();
  public readonly onCharacterRemoving = new Signal<void>();

  onStart(): void {
    onCharacterAdded(LocalPlayer, (character) => {
      this.characterAdded(character).catch((err) => {
        warn(`Could not get character rig because:\n${err}`);
      });
    });
  }

  /**
   * Gets the current character for the local player. This is the character
   * that has been loaded and exists according to the character schema.
   *
   * @returns The current character rig if it exists.
   */
  public getCurrentCharacter(): CharacterRig | undefined {
    return this.currentCharacter;
  }

  /**
   * Ensures that a character model is loaded and exists according to the
   * schema. If the character model is removed before it loads, or if it fails
   * to load within the timeout, the promise will reject.
   *
   * @param model - The model to load the character rig from.
   * @returns A promise that resolves when the character rig is loaded.
   */
  private async characterAdded(model: Model): Promise<void> {
    const promise = promiseTree(model, characterSchema);

    // If character fails to load, we cancel the promise
    const timeout = task.delay(CHARACTER_LOAD_TIMEOUT, () => {
      promise.cancel();
    });

    // If our character is removed before it loads, we cancel
    const connection = model.AncestryChanged.Connect(() => {
      if (model.IsDescendantOf(game)) return;

      promise.cancel();
    });

    const [success, rig] = promise.await();
    task.cancel(timeout);
    connection.Disconnect();

    if (!success) {
      throw 'Character failed to load.';
    }

    this.listenForCharacterRemoving(model);
    this.onRigLoaded(rig);
  }

  /**
   * Listens for the character model to be removed from the game.
   *
   * @param character - The character model to listen for removal on.
   */
  private listenForCharacterRemoving(character: Model): void {
    const connection = character.AncestryChanged.Connect(() => {
      if (character.IsDescendantOf(game)) {
        return;
      }

      connection.Disconnect();
      this.currentCharacter = undefined;
      this.onCharacterRemoving.Fire();
    });
  }

  /**
   * Called when the character rig has been fully loaded.
   *
   * @param rig - The character rig that was loaded.
   */

  private onRigLoaded(rig: CharacterRig): void {
    print('Loaded character rig.');
    this.currentCharacter = rig;
    this.onCharacterAdded.Fire(rig);
  }
}
