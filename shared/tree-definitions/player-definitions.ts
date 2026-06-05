import { EvaluateInstanceTree } from '@rbxts/validate-tree';

export type CharacterRig = EvaluateInstanceTree<typeof characterSchema>;

export const characterSchema = {
  $className: 'Model',
  Head: 'BasePart',
  Humanoid: {
    $className: 'Humanoid',
    Animator: 'Animator',
  },
  HumanoidRootPart: 'BasePart',
  ['Right Arm']: 'BasePart',
} as const;
