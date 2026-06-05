import { Controller, OnStart } from '@flamework/core';
import { computed, effect, peek } from '@rbxts/charm';
import { GameManager } from 'shared/game';
import { GamePhase } from 'shared/game/types';

@Controller({})
export class GameController implements OnStart {
  onStart(): void {
    // const phase = computed(() => GameManager.getState().phase);
    // effect(() => {
    //   const countdown = peek(() => GameManager.getState().countdown);
    //   print(`[Game Controller] ${this.formatStatus(phase(), countdown)}`);
    // });
  }

  private formatStatus(phase: GamePhase, countdown: number): string {
    if (phase === 'waiting') {
      return 'waiting for players';
    }
    if (phase === 'countdown') {
      return `starting game in ${countdown}s`;
    }

    return 'game started';
  }
}
