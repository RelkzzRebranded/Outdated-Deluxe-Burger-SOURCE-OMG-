import { EvaluateInstanceTree } from '@rbxts/validate-tree';

export const ToolGunDefinition = {
  $className: 'Tool',
  Handle: {
    $className: 'BasePart',
    MuzzleAttachment: 'Attachment',
  },
  Animations: {
    $className: 'Folder',
    Idle: 'Animation',
    Shoot: 'Animation',
    Inspect: 'Animation',
  },
  Sounds: {
    $className: 'Folder',
  },
} as const;

export type ToolGunDefinition = EvaluateInstanceTree<typeof ToolGunDefinition>;
