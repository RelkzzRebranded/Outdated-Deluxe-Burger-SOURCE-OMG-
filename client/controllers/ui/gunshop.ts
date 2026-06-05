/* eslint-disable roblox-ts/lua-truthiness */
import { Janitor } from '@rbxts/janitor';
import { GunAttributes } from 'client/components/gun.component';
import { LocalPlayer } from 'client/constants';
import { Data, DataManager } from 'shared';
import { assets } from 'shared/constants';
import { IDRegistry } from 'shared/registry/id-registry';
import { WeaponRegistry } from 'shared/registry/weapon-registry';

interface WeaponNameInfo {
  readonly button: WeaponButton;
  readonly bin: Janitor;
}

type stateTags = 'locked' | 'owned' | 'equipped';
type PreviewAction = 'Buy' | 'Equip' | 'Equipped';

type MainFrameName = ExtractKeys<
  PlayerGui['Main'],
  Frame & {
    List: ScrollingFrame;
  }
>;

const whitelistedAttributes = new Map<string, boolean>([
  ['price', true],
  ['damage', true],
  ['rateOfFire', true],
]);
export abstract class GunShopUIController<K extends MainFrameName = MainFrameName> {
  protected currenctAction: PreviewAction = 'Buy';
  private buttons = new Map<string, WeaponNameInfo>();
  private slotContainer: ScrollingFrame;
  private previewFrame;
  public constructor(protected readonly frame: PlayerGui['Main'][K]) {
    this.slotContainer = frame.List;
    this.previewFrame = frame.Preview;
  }

  protected abstract onItemClick(id: string): void;

  protected createSlotButton(id: string, state: string) {
    const item = WeaponRegistry.get<Tool>(id);
    const bin = new Janitor();
    const button = this.frame.List.Template.Clone();

    const info = { button, bin };
    button.Name = item.Name;
    button.GunIcon.Image = item.TextureId;
    button.GunName.Text = item.Name;
    button.State.Text = state ?? 'LOCKED';
    button.Visible = true;
    button.LayoutOrder = <number>item.GetAttribute('price');
    this.changeStyle(state.lower() as stateTags, info);
    this.handleButtonEvents(id, info);
    button.Parent = this.slotContainer;

    this.buttons.set(id, info);
    return button;
  }

  private createStatLabel(attribute: string, value: unknown): void {
    const label = this.previewFrame.StatsList.Template.Clone();

    label.Name = attribute;
    label.Text = `${attribute.upper()}: ${value}`;
    label.Visible = true;
    label.Parent = this.previewFrame.StatsList;
  }

  protected updatePreviewStatList(id?: string): void {
    const data = DataManager.getData(LocalPlayer.UserId);
    const item = id ? WeaponRegistry.get<Tool>(id) : undefined;

    // clean up so there's no memory leakage
    this.clearPreviewStats();
    // Update the gun icon and it's stats
    this.updatePreviewInfo(id, item, data);
    if (!item) return; // prevent it from creating stat text if there is no id passed on the function

    const attributes = item!.GetAttributes() as Map<
      keyof GunAttributes,
      GunAttributes[keyof GunAttributes]
    >;
    for (const [attribute, value] of attributes) {
      if (whitelistedAttributes.has(attribute)) {
        this.createStatLabel(attribute, value);
      }
    }
  }

  private clearPreviewStats(): void {
    for (const statText of this.previewFrame.StatsList.GetChildren()
      .filter((obj) => obj.Name !== 'Template')
      .filter((obj) => !obj.IsA('UIGridLayout')))
      statText.Destroy();
  }

  private updatePreviewInfo(id: string | undefined, item: Tool | undefined, data: Data): void {
    const { GunIcon, GunName, Buy } = this.previewFrame;

    GunIcon.Visible = true;
    GunName.Visible = true;
    Buy.Visible = true;

    GunIcon.Image = item?.TextureId ?? '';
    GunName.Text = id ?? '';

    if (!id) {
      Buy.Text = 'Buy';
      return;
    }

    if (data.profile.equippedGun === id) {
      this.currenctAction = 'Equipped';
    } else if (data.profile.ownedGuns.has(id)) {
      this.currenctAction = 'Equip';
    } else {
      this.currenctAction = 'Buy';
    }
    Buy.Text = this.currenctAction;
  }

  private changeStyle(tagName: stateTags, { button }: WeaponNameInfo) {
    const slot = button.Slot;
    const state = button.State;
    for (const tag of slot.GetTags()) slot.RemoveTag(tag);
    for (const tag of state.GetTags()) state.RemoveTag(tag);
    state.Text = tagName;
    switch (tagName) {
      case 'locked':
        slot.AddTag('lockedOutline');
        state.AddTag('locked');
        break;
      case 'equipped':
        slot.AddTag('equippedOutline');
        state.AddTag('equipped');
        break;
      case 'owned':
        slot.AddTag('ownedOutline');
        state.AddTag('owned');
        break;
      default:
        warn(tagName + ' does not exist in the stateTags!');
        break;
    }
  }

  private handleButtonEvents(id: string, { button, bin }: WeaponNameInfo) {
    bin.Add(button.Activated.Connect(() => this.onItemClick(id)));
  }

  protected update(data: Data): void {
    for (const [id, info] of this.buttons) {
      if (data.profile.equippedGun === id) {
        this.changeStyle('equipped', info);
      } else if (data.profile.ownedGuns.has(id)) {
        this.changeStyle('owned', info);
      } else this.changeStyle('locked', info);
    }
  }

  protected load(): void {
    const weaponTools = assets.Weapons.GetChildren();
    for (const tools of weaponTools)
      this.createSlotButton(<string>tools.GetAttribute('id'), 'locked');
  }
}
