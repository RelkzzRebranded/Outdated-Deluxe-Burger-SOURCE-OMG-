import { Controller, OnStart } from '@flamework/core';
import QuickZone from '@rbxts/quickzone';
import { ZoneRegistry } from './registry';

@Controller()
export class ZoneController implements OnStart {
  private player = QuickZone.Group.localPlayer();
  private zones = QuickZone.Zone.fromTag('_ZONE');
  private observer = new QuickZone.Observer({
    groups: [this.player],
    zones: [this.zones],
  });
  onStart(): void {
    this.observer.observe((player: Player, zone) => {
      const part = zone.getReference();
      const attributeType = <string>part?.GetAttribute('type');
      ZoneRegistry[attributeType](zone);
      return () => {
        ZoneRegistry['OnExit' + attributeType](zone);
      };
    });
  }
}
