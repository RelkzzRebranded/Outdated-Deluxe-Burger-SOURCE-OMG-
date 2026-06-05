import { MarketplaceService } from '@rbxts/services';
import { Gamepasses } from './types';

export const GamepassIDs: Gamepasses = {
  double_cash: 1858822418,
} as const;

export function UserHasPass(plr_id: number, id: Gamepasses[keyof Gamepasses]): boolean {
  const pass = MarketplaceService.UserOwnsGamePassAsync(plr_id, id);
  return pass;
}
