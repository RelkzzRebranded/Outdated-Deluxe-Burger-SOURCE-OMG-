import { DataManager } from 'shared';

export function IncreaseKills(plr_id: number, amount: number): void {
  DataManager.updateData(plr_id, (data) => {
    data.profile.noobsKilled += math.max(0, amount);
  });
}
export function DecreaseKills(plr_id: number, amount: number): void {
  DataManager.updateData(plr_id, (data) => {
    data.profile.noobsKilled -= math.max(0, amount);
  });
}
