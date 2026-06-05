import { playSoundFromSource } from 'shared/utils/sound';

const SOUND_EVENT = 'Sound';

export function bindSoundToAnimationEvents(
  animation: AnimationTrack,
  sounds: Folder,
  target: Instance,
) {
  animation.GetMarkerReachedSignal(SOUND_EVENT).Connect((param) => {
    const sound = sounds.FindFirstChild(param!) as AudioPlayer;
    if (!sound) return;
    playSoundFromSource(sound, target);
  });
}
