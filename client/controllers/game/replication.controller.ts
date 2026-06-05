/* eslint-disable no-void */
import { Controller, OnStart } from '@flamework/core';
import { Events, Functions } from 'client/network';
import { GameManager } from 'shared/game';
import { GameReplicationPayload } from 'shared/game/replication';

@Controller({})
export class GameReplicationController implements OnStart {
  public onStart(): void {
    Events.game.syncDelta.connect((payload: GameReplicationPayload) => {
      GameManager.setState(payload.state);
    });
    void Functions.requestGameHydration.invoke();
  }
}
