import { Dependency, OnInit, OnStart, Service } from '@flamework/core';
import { Players, TeleportService, Workspace } from '@rbxts/services';
import { Clock } from 'shared';
import { GameManager } from 'shared/game';
import { WaveService } from './wave';
import { effect } from '@rbxts/charm';
import { Events } from 'server/network';
import { GameBaseComponent } from 'server/components/base';
import { Components } from '@flamework/components';

const GAME_COUNTDOWN = 10;
@Service({})
export class GameStateService implements OnStart, OnInit {
  private readonly clock = new Clock(1);
  private gameEnded = false;
  private skipVotes = new Set<Player>();
  private basecomponent?: GameBaseComponent;
  constructor(private readonly waveService: WaveService) {}
  onInit(): void | Promise<void> {
    Dependency<Components>()
      .waitForComponent<GameBaseComponent>(Workspace.Base)
      .then((comp) => {
        this.basecomponent = comp;
      });
  }
  onStart(): void {
    Players.PlayerRemoving.Connect((player) => {
      this.skipVotes.delete(player);
      this.updateVotes();
    });
    this.clock.on(() => this.tick());
    const atom = GameManager.selectState();
    effect(() => {
      const phase = atom().phase;
      if (phase !== 'game_over') {
        this.gameEnded = false;
        return;
      }

      if (this.gameEnded) return;
      this.gameEnded = true;
      task.delay(9, () => {
        this.waveService.clearAllEnemies();
        this.basecomponent?.increaseHealth(500);
        GameManager.updateState((state) => {
          state.phase = 'waiting';
        });
      });
    });
    Events.skip.connect((player) => this.voteSkip(player));
  }

  public voteSkip(player: Player): void {
    const state = GameManager.selectState()();
    if (state.phase !== 'countdown') return;
    if (this.skipVotes.has(player) && state.countdown < 3) return;
    this.skipVotes.add(player);
    this.updateVotes();

    if (this.skipVotes.size() >= state.skipVotesRequired) {
      GameManager.updateState((state) => (state.countdown = 2));
    }
  }

  private updateVotes(): void {
    const totalPlayers = Players.GetPlayers().size();
    const required = totalPlayers === 1 ? 1 : math.ceil(totalPlayers * 0.5);

    GameManager.updateState((state) => {
      state.skipVotes = this.skipVotes.size();
      state.skipVotesRequired = required;
    });
  }

  private tick(): void {
    let startGame = false;
    const totalPlayers = Players.GetPlayers().size();

    this.updateVotes();

    GameManager.updateState((state) => {
      state.players = totalPlayers;

      if (state.phase === 'game_over') {
        state.wave = 1;
        return;
      }

      if (state.phase === 'playing') return;

      if (totalPlayers === 0) {
        state.countdown = GAME_COUNTDOWN;
        state.phase = 'waiting';
        return;
      }

      if (state.countdown <= 1) {
        this.skipVotes.clear();

        state.skipVotes = 0;
        state.skipVotesRequired = 0;

        state.countdown = GAME_COUNTDOWN;
        state.phase = 'playing';
        startGame = true;
        return;
      }

      state.countdown -= 1;
      state.phase = 'countdown';
    });

    if (startGame) {
      this.start();
    }
  }

  private start(): void {
    print('Starting Game... Good LUCK!');
    this.waveService.start();
  }
}
