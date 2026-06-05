import { BaseComponent, Component } from '@flamework/components';
import { OnStart } from '@flamework/core';
import { Signal } from '@rbxts/beacon';
import { Janitor } from '@rbxts/janitor';
import Object from '@rbxts/object-utils';
import { GameManager } from 'shared/game';

interface attributes {
  HEALTH: number;
  MAX_HEALTH: number;
}

@Component({
  tag: 'BASE',
})
export class ClientGameBaseComponent extends BaseComponent<attributes, Part> {}
