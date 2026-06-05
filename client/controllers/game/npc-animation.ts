import { audio } from 'client/constants';
import { CharacterRig, ToolGunDefinition } from 'shared';
import { assets } from 'shared/constants';
import { bindSoundToAnimationEvents } from 'shared/gfs/gfs-utils/bindSoundToAnimEvents';

// STUPID HEART2x YEAH I LOVED YOU FROM THE START STUPID HEART2x HAD TO LET IT FALL APART
// AINT LOVE A BITCH OH MY STUPID HEART.
// - larper (his dih hurts)

const soundLibrary = audio.NPC;
const audioTarget = audio.Busses.World.AudioCompressor;

const NPC_TAG_DICTIONARY = {
  ENEMY: 'Enemy',
  STATIC: 'Static',
} as const;

type NPCTag = keyof typeof NPC_TAG_DICTIONARY;

export class NPCAnimationController {
  private enabled = false;
  private loadedAnimations = false;
  private instance!: CharacterRig;
  public animationTracks = new Map<string, AnimationTrack>();

  constructor(noob: CharacterRig) {
    this.instance = <CharacterRig>noob;
  }

  private loadAnimations(): void {
    if (this.loadedAnimations) return;
    this.loadedAnimations = true;
    const tag = this.instance.GetTags()[0] as NPCTag;
    const category = NPC_TAG_DICTIONARY[tag];

    const animationsFolder = assets.Animation.NPC[category].FindFirstChild(this.instance.Name);
    assert(
      animationsFolder,
      `Animation folder ${this.instance.Name} from ${category} is not found`,
    );
    const humanoid = this.instance.Humanoid;
    assert(humanoid, 'NPC Humanoid doesnt exist');
    const animator = humanoid.Animator;

    const animationTracks = new Map<string, AnimationTrack>();
    for (const animation of <Animation[]>animationsFolder.GetChildren()) {
      const animationTrack = animator.LoadAnimation(animation);
      animationTracks.set(animation.Name, animationTrack);

      bindSoundToAnimationEvents(animationTrack, soundLibrary[category], audioTarget);
    }
    this.animationTracks = animationTracks;
  }

  public enable(): void {
    if (this.enabled) return;
    this.enabled = true;

    if (!this.loadedAnimations) this.loadAnimations();

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
