import { Networking } from '@flamework/networking';
import { GameReplicationPayload } from './game/replication';
import { ToolGunDefinition } from './tree-definitions';

interface ServerToClientEvents {
  core: {
    dataDelta: (payload: buffer) => void;
  };
  game: {
    syncDelta: (payload: GameReplicationPayload) => void;
  };
}

interface ServerToClientFunctions {}

interface ClientToServerEvents {
  shoot: (
    now: number,
    gun: ToolGunDefinition,
    origin: CFrame,
    tagged: Map<string, Humanoid>,
  ) => void;
  skip: () => void;
}

interface ClientToServerFunctions {
  requestHydration: () => void;
  requestGameHydration: () => void;
  requestBuy: (id: string) => boolean;
  requestGunEquip: (id: string) => boolean;
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<
  ClientToServerFunctions,
  ServerToClientFunctions
>();
