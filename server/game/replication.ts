import { OnStart, Service } from '@flamework/core';
import { Players } from '@rbxts/services';
import { Events, Functions } from 'server/network';
import { Clock } from 'shared';
import { GameManager } from 'shared/game';
import { GameReplica } from 'shared/game/replication';

const SYNC_INTERVAL = 1 / 10;

@Service()
export class GameReplicationService implements OnStart {
  private readonly replica = new GameReplica(GameManager.getState());
  private readonly clock = new Clock(SYNC_INTERVAL);

  public onStart(): void {
    Functions.requestGameHydration.setCallback((player: Player) => this.sendSnapshot(player));
    this.clock.on(() => this.flushDelta());
  }

  private flushDelta(): void {
    const payload = this.replica.update(GameManager.getState());
    if (!payload) return;
    for (const player of Players.GetPlayers()) {
      Events.game.syncDelta(player, payload);
    }
  }

  private sendSnapshot(player: Player): void {
    Events.game.syncDelta(player, this.replica.snapshot(GameManager.getState()));
  }
}
