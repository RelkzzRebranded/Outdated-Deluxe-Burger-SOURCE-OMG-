import { Flamework } from '@flamework/core';
import Chrono from 'rbxts-chrono';

Flamework.addPaths('src/server');
Flamework.addPaths('src/shared');

Chrono.Start();
Flamework.ignite();
