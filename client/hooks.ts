import { CharacterRig } from 'shared';

export interface OnCharacterAdd {
  /** @hidden */
  onCharacterAdd(character: CharacterRig): void;
}

export interface OnCharacterRemove {
  /** @hidden */
  onCharacterRemove(character: CharacterRig): void;
}
