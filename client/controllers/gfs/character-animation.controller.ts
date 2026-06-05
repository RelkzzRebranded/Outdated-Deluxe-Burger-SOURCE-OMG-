import { audio } from 'client/constants';
import { CharacterRig, ToolGunDefinition } from 'shared';
import { bindSoundToAnimationEvents } from 'shared/gfs/gfs-utils/bindSoundToAnimEvents';

type GunAnimNames = 'Idle' | 'Shoot' | 'Inspect';

const audioTarget = audio.Busses.World.AudioCompressor;

export class CharacterAnimationController {
  private enabled = false;
  private loadedAnimations = false;
  private gun!: ToolGunDefinition;
  public animationTracks = new Map<GunAnimNames, AnimationTrack>();

  constructor(gun: Tool) {
    this.gun = <ToolGunDefinition>gun;
  }

  public playShootAnimation(): void {
    this.animationTracks.get('Shoot')?.Play(0, 1);
  }

  public playInspectAnimation(): void {
    this.animationTracks.get('Inspect')?.Play(0.05, 10);
  }

  public stopInspectAnimation(): void {
    if (!this.animationTracks.get('Inspect')?.IsPlaying) return;
    this.animationTracks.get('Inspect')?.Stop(0.1);
  }

  private loadAnimations(): void {
    if (this.loadedAnimations) return;
    this.loadedAnimations = true;
    const animationsFolder = this.gun.Animations;
    const humanoid = <CharacterRig['Humanoid']>this.gun.Parent?.FindFirstChildOfClass('Humanoid');
    assert(humanoid, 'Gun is not equipped');
    const animator = humanoid.Animator;

    const animationTracks = new Map<GunAnimNames, AnimationTrack>();
    for (const animation of <Animation[]>animationsFolder.GetChildren()) {
      const animationTrack = animator.LoadAnimation(animation);
      animationTracks.set(animation.Name as GunAnimNames, animationTrack);

      bindSoundToAnimationEvents(animationTrack, this.gun.Sounds, audioTarget);
    }
    this.animationTracks = animationTracks;
  }

  public enable(): void {
    if (this.enabled) return;
    this.enabled = true;

    if (!this.loadedAnimations) this.loadAnimations();

    this.animationTracks.get('Idle')!.Priority = Enum.AnimationPriority.Action;
    this.animationTracks.get('Idle')?.AdjustWeight(0, 0);
    this.animationTracks.get('Idle')?.Play();
  }

  public disable(): void {
    if (!this.enabled) return;
    this.enabled = false;

    for (const [_, animation] of this.animationTracks) {
      animation.Stop();
    }
  }

  public destroy(): void {
    this.disable();

    this.animationTracks.clear();
  }
}
