import { HttpService } from '@rbxts/services';
import { GameState } from '../types';
import { GameReplicationPayload } from './types';

export class GameReplica {
  private lastSerialized?: string;

  public constructor(initial?: GameState) {
    if (initial !== undefined) {
      this.lastSerialized = this.serialize(initial);
    }
  }

  public update(state: GameState): GameReplicationPayload | undefined {
    const serialized = this.serialize(state);
    if (serialized === this.lastSerialized) {
      return;
    }

    this.lastSerialized = serialized;
    return {
      state,
    };
  }

  public snapshot(state: GameState): GameReplicationPayload {
    this.lastSerialized = this.serialize(state);
    return {
      state,
    };
  }

  private serialize(state: GameState): string {
    return HttpService.JSONEncode(state);
  }
}
