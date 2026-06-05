export type Songs = 'none' | 'gameplay' | 'intermission' | 'shop' | 'game_over';

export interface MusicState {
  song: Songs;
}
