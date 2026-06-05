import { Players, ReplicatedStorage, SoundService, Workspace } from '@rbxts/services';

export const LocalPlayer = Players.LocalPlayer;
export const playerGui = LocalPlayer.WaitForChild('PlayerGui') as PlayerGui;
export const mainScreen = playerGui.WaitForChild('Main', 30) as PlayerGui['Main'];
export const base = Workspace.WaitForChild('Base') as Part;
export const enemies = Workspace.WaitForChild('ENEMIES') as Folder;
export const audio = SoundService.WaitForChild('Audio') as SoundService['Audio'];
