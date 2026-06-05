import { t } from '@rbxts/t';

export const IS_PROFILE_DATA = t.interface({
  // Returning & Statistics
  timePlayed: t.number,
  lastLogin: t.string,
  loginStreak: t.number,
  noobsKilled: t.number,
  // Currency
  cash: t.number,
  // Guns
  equippedGun: t.string,
  ownedGuns: t.map(t.string, t.boolean), // its a dictionary duh
});

export const IS_DATA = t.interface({
  profile: IS_PROFILE_DATA,
});

export type ProfileData = t.static<typeof IS_PROFILE_DATA>;

export type Data = t.static<typeof IS_DATA>;
