import { Service } from '@flamework/core';
import { CollectionService, ReplicatedStorage, Workspace } from '@rbxts/services';
import { CharacterRig, toFixed } from 'shared';
import { GameManager } from 'shared/game';

@Service()
export class NpcSpawnService {
  private spawner = CollectionService.GetTagged('ENEMY_SPAWNER')[0] as Part;
  private enemiesFolder = Workspace.ENEMIES;
  /**
   * Spawns enemies with the chosen name
   * @param name name of entity to spawn
   * @returns undefined
   */
  spawn(name: keyof typeof ReplicatedStorage.Enemies) {
    const healthMultiplier = this.calculateHpMultiplier();
    const enemies = ReplicatedStorage.Enemies.FindFirstChild(name) as CharacterRig;
    if (!enemies || (enemies && !enemies.HasTag('ENEMY'))) {
      warn('unable to find available enemy type');
      return;
    }
    const clone = enemies.Clone() as CharacterRig;
    clone.Humanoid.MaxHealth += enemies.Humanoid.MaxHealth * healthMultiplier;
    clone.Humanoid.Health += enemies.Humanoid.Health * healthMultiplier;
    clone.PivotTo(
      this.spawner.CFrame.add(
        new Vector3(math.random(-this.spawner.Size.X / 2, this.spawner.Size.X / 2), 0, 0),
      ),
    );
    clone.Parent = this.enemiesFolder;
  }
  private calculateHpMultiplier(): number {
    const wave = GameManager.getState().wave;
    // there will be no hp multiplier set till wave 8
    const calculated = 1.05 ** (wave - 8); // wave 8=1, wave 18≈1.63
    print('HP MULTIPLIER:', calculated);
    return math.max(1, toFixed(calculated, 2, true));
  }
}
