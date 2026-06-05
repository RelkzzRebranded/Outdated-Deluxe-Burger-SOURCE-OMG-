import { DataManager } from 'shared';
import { GamepassIDs, UserHasPass } from 'shared/utils/marketplace';

type Currency_Types = 'money';

export function IncreaseCurrency(
  plr_id: number,
  currency_type: Currency_Types,
  amount: number,
): void {
  const doublecash = UserHasPass(plr_id, GamepassIDs.double_cash) ? 2 : 1;
  switch (currency_type) {
    case 'money':
      DataManager.updateData(plr_id, (data) => {
        data.profile.cash += math.max(0, amount) * doublecash;
      });
      break;
    default:
      warn(`couldnt find avaiable types of currencies.`);
      break;
  }
}
export function DecreaseCurrency(
  plr_id: number,
  currency_type: Currency_Types,
  amount: number,
): void {
  switch (currency_type) {
    case 'money':
      DataManager.updateData(plr_id, (data) => {
        data.profile.cash -= math.max(0, amount);
      });
      break;
    default:
      warn(`couldnt find avaiable types of currencies.`);
      break;
  }
}
