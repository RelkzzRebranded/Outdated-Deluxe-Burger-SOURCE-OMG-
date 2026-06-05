import { Register, Start } from '@rbxts/refx';
import { ReplicatedStorage } from '@rbxts/services';

import { Flamework } from '@flamework/core';
import Chrono from 'rbxts-chrono';

Flamework.addPaths('src/client');
Flamework.addPaths('src/shared');

Register(ReplicatedStorage.TS.gfs.replication);
Start();

Chrono.Start();

Flamework.ignite();
