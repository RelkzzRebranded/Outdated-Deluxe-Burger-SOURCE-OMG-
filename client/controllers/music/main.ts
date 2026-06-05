import { effect } from '@rbxts/charm';
import { Songs } from './state/types';
import { SoundService } from '@rbxts/services';
import { TweenBuilder } from '@rbxts/twin';
import { GameManager } from 'shared/game';
import { GameState } from 'shared/game/types';

const SONG_MAP: Record<Songs, string> = {
  none: '0',
  gameplay: '122408807781490',
  intermission: '108149605652325',
  shop: '97206192933302',
  game_over: '83157951362083',
};

const DEFAULT_VOLUME = 0.5;

class BackgroundMusicPlayerController {
  private GameState = GameManager.selectState();
  private musicPlayer = new Instance('Sound');
  private lastSongId: string | undefined;
  private manualOverride = false;

  private musicFadeOut = TweenBuilder.for(this.musicPlayer)
    .property('Volume', 0)
    .time(0.3)
    .style(Enum.EasingStyle.Quad)
    .direction(Enum.EasingDirection.Out)
    .build();

  private musicFadeIn = TweenBuilder.for(this.musicPlayer)
    .property('Volume', DEFAULT_VOLUME)
    .time(0.3)
    .style(Enum.EasingStyle.Quad)
    .direction(Enum.EasingDirection.Out)
    .build();

  constructor() {
    this.musicPlayer.Looped = true;
    this.musicPlayer.Volume = DEFAULT_VOLUME;
    this.musicPlayer.Parent = SoundService;
    effect(() => {
      // If manual override is active, don't auto-switch
      if (this.manualOverride) return;

      const gameState = this.GameState();
      const song = this.getSongForPhase(gameState.phase);
      this.playSong(song);
    });
  }

  private getSongForPhase(phase: GameState['phase']): Songs {
    switch (phase) {
      case 'countdown':
        return 'intermission';
      case 'playing':
        return 'gameplay';
      case 'game_over':
        return 'game_over';
      default:
        return 'none';
    }
  }

  private playSong(song: Songs): void {
    const songId = 'rbxassetid://' + SONG_MAP[song];
    if (songId === this.lastSongId) return;
    this.lastSongId = songId;

    this.musicFadeOut.Play();
    this.musicFadeOut.Completed.Wait();

    this.musicPlayer.SoundId = songId;
    this.musicPlayer.Play();

    this.musicFadeIn.Play();
  }

  public changeSong(song: Songs): void {
    this.manualOverride = true;
    this.playSong(song);
  }

  public clearOverride(): void {
    this.manualOverride = false;
    // Immediately sync to current game phase
    const gameState = this.GameState();
    const song = this.getSongForPhase(gameState.phase);
    this.playSong(song);
  }
}

export const BackgroundMusicPlayer = new BackgroundMusicPlayerController();
