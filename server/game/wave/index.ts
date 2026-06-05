import { Service } from '@flamework/core';
import { ReplicatedStorage, Workspace } from '@rbxts/services';
import { NpcSpawnService } from '../npc/spawner';
import { Clock } from 'shared';
import { GameManager } from 'shared/game';

const enemiesFolder = Workspace.ENEMIES;
@Service({})
export class WaveService {
  private readonly clock = new Clock(0.1);
  private started = false;
  private GameAtom = GameManager.selectState();
  constructor(private readonly npcSpawnService: NpcSpawnService) {}
  public start(): void {
    if (this.started) return;
    this.started = true;
    this.clock.on(() => this.tick());
  }
  private tick(): void {
    const state = this.GameAtom();
    if (state.phase === 'game_over') return;
    if (state.spawning) return;
    if (enemiesFolder.GetChildren().size() > 0) return;

    GameManager.updateState((state) => {
      state.spawning = true;
      state.wave++;
    });

    task.spawn(() => this.startWave());
  }

  private startWave(): void {
    const wave = this.GameAtom().wave;

    if (this.GameAtom().phase === 'game_over') {
      GameManager.updateState((state) => {
        state.spawning = false;
      });
    }

    print('WAVE:', wave);
    if (wave >= 1) {
      this.spawn('Noob', math.min(5 + wave, 25));
    }
    if (wave >= 10) {
      this.spawn('FastNoob', math.min(2 + wave, 15));
    }
    if (wave >= 20) {
      this.spawn('BigNoob', math.min(1 + wave, 2));
    }
    GameManager.updateState((state) => (state.spawning = false));
  }

  private spawn(name: keyof typeof ReplicatedStorage.Enemies, quantity: number) {
    for (let i = 0; i < quantity; i++) {
      if (this.GameAtom().phase === 'game_over') break;
      this.npcSpawnService.spawn(name);
      task.wait(1);
    }
  }
  public clearAllEnemies(): void {
    for (const enemies of enemiesFolder.GetChildren()) {
      enemies.Destroy();
    }
  }
}
