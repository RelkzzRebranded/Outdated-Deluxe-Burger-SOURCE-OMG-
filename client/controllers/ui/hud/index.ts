import { Components } from '@flamework/components';
import { Controller, Dependency, OnInit, OnStart } from '@flamework/core';
import { effect } from '@rbxts/charm';
import { Janitor } from '@rbxts/janitor';
import { UserInputService, Workspace } from '@rbxts/services';
import { TweenBuilder } from '@rbxts/twin';
import { ClientGameBaseComponent } from 'client/components/base';
import { base, enemies, LocalPlayer, mainScreen } from 'client/constants';
import { InputCategorizerController } from 'client/controllers/gfs/input-categorizer.controller';
import { Data, DataManager, GameClock, toFixed } from 'shared';
import { GameManager } from 'shared/game';
import { GameState } from 'shared/game/types';
import { HUD_CONSTANTS } from './constant';
import { Events } from 'client/network';

/**
 * THIS IS INCREDIBLY FUN!! CANT YOU FEEL THE FUN!? THE GAZE OF THE CHAOS!
 * AH WHAT A TIME TO BE IN!
 * - larper
 */

const TRANSPARENCY_PROPERTIES = {
  Frame: 'BackgroundTransparency',
  TextLabel: 'TextTransparency',
  TextButton: 'TextTransparency',
  ImageLabel: 'ImageTransparency',
  ImageButton: 'ImageTransparency',
  UIStroke: 'Transparency',
} as const;

@Controller({})
export class HUDController implements OnStart, OnInit {
  // Variables
  private gui = mainScreen.Gameplay.HUD;
  private gamestate = GameManager.selectState();
  private owndata = DataManager.selectData(LocalPlayer.UserId);
  private basecomponent?: ClientGameBaseComponent;

  // States
  private playing = false;
  private onMobile = false;
  private canSkip = false;
  private warningstate = false;

  constructor(private readonly inputCategorizer: InputCategorizerController) {}

  onInit(): void | Promise<void> {
    Dependency<Components>()
      .waitForComponent<ClientGameBaseComponent>(base)
      .then((comp) => {
        this.basecomponent = comp;
      });
  }

  onStart(): void {
    this.gui.Topbar.BurgerWarning.Visible = true;
    this.warningFade(1, 0);

    this.basecomponent?.onAttributeChanged('HEALTH', () => {
      const newval = this.basecomponent!.attributes.HEALTH!;
      const healthpercentage = (newval / this.basecomponent!.attributes.MAX_HEALTH) * 100;
      if (healthpercentage < 30 && !this.warningstate) {
        this.warningstate = true;
        this.warningFade(0, 0.5);
      } else if (healthpercentage >= 30 && this.warningstate) {
        this.warningstate = false;
        this.warningFade(1, 0.5);
      }
      // micro-optimization my ass this is like pouring a cup of water to the ocean
      if (this.warningstate) {
        this.gui.Topbar.BurgerWarning.Label.Text = `THE BURGER IS AT ${toFixed(healthpercentage, 1)}% HEALTH!!`;
      }
    });

    effect(() => {
      const gamedata = this.gamestate();
      const data = this.owndata();
      this.updateStats(data);
      this.updateTopBar(gamedata);
      this.updateIntermissionSkipButton(gamedata);
    });

    GameClock.on(() => {
      if (!this.playing) return;
      this.gui.Topbar.RightLabel.Label.Text = `${enemies.GetChildren().size()} LEFT.`;
    });

    this.gui.IntermissionSkipButton.Button.Activated.Connect(() =>
      this.OnIntermissionSkipButtonPressed(),
    );

    this.inputCategorizer.lastInputCategoryChangedEvent.Connect((lastInputCategory) =>
      this.onLastInputCategoryChanged(lastInputCategory),
    );

    const lastInputCategory = this.inputCategorizer.getLastInputCategory();
    this.onLastInputCategoryChanged(lastInputCategory);
  }

  private warningFade(opacity: number, speed: number): void {
    TweenBuilder.for(this.gui.Topbar.BurgerWarning)
      .property('BackgroundTransparency', opacity)
      .time(speed)
      .style(Enum.EasingStyle.Quint)
      .direction(Enum.EasingDirection.Out)
      .play();
    for (const child of this.gui.Topbar.BurgerWarning.GetDescendants().filter(
      (obj) => obj.IsA('GuiObject') || obj.IsA('UIStroke'),
    )) {
      TweenBuilder.for(child)
        .property(
          // I LOVE YOU GENERIC TYPE ARGUMENT RRAHHHHHHHH!!!
          <ExtractKeys<typeof child, Tweenable>>(
            TRANSPARENCY_PROPERTIES[child.ClassName as keyof typeof TRANSPARENCY_PROPERTIES]
          ),
          opacity,
        )
        .time(speed)
        .style(Enum.EasingStyle.Quint)
        .direction(Enum.EasingDirection.Out)
        .play();
    }
  }

  private OnIntermissionSkipButtonPressed(): void {
    this.gui.IntermissionSkipButton.Label.Text = 'Skipping...';
    Events.skip();
  }

  private enableTouchInput(): void {
    this.gui.IntermissionSkipButton.Active = true;
  }
  private disableTouchInput(): void {
    this.gui.IntermissionSkipButton.Active = false;
  }

  private enableOtherInput(): void {
    UserInputService.InputBegan.Connect((inputObject, processed) => {
      if (processed) return;
      if (!this.canSkip) return;
      if (
        inputObject.KeyCode === HUD_CONSTANTS.KEYBOARD_SKIP_KEY_CODE ||
        inputObject.KeyCode === HUD_CONSTANTS.GAMEPAD_SKIP_KEY_CODE
      )
        this.OnIntermissionSkipButtonPressed();
    });
  }

  private updateTopBar(gamedata: GameState): void {
    const phase = gamedata.phase;
    this.playing = false;
    if (phase === 'playing') {
      this.playing = true;
      // wave
      this.gui.Topbar.LeftLabel.Label.Text = `WAVE ${gamedata.wave}`;
    } else if (phase === 'countdown') {
      this.gui.Topbar.RightLabel.Label.Text = `STARTING IN: ${gamedata.countdown}s`;
    } else if (phase === 'game_over') {
      this.gui.Topbar.RightLabel.Label.Text = 'GAME ENDED!';
    } else if (phase === 'waiting') {
      this.gui.Topbar.RightLabel.Label.Text = 'waiting for players...';
    } else {
      warn(`error! game phase state is not a valid value! what the hell bro! (${phase})`);
      return;
    }
  }

  private updateStats(data: Data): void {
    this.gui.Stats.Money.Label.Text = `$${data.profile.cash}`;
    this.gui.Stats.Kills.Label.Text = `${data.profile.noobsKilled} KILLS`;
  }

  private updateIntermissionSkipButton(gamedata: GameState): void {
    const intermissionSkipped = gamedata.skipVotes;
    if (gamedata.phase === 'countdown' && gamedata.countdown >= 3) {
      this.canSkip = true;
      this.gui.IntermissionSkipButton.Visible = true;
      this.gui.IntermissionSkipButton.Label.Text = `Skip Intermission? (${intermissionSkipped}/${gamedata.skipVotesRequired})${this.onMobile ? '' : '\n(keyboard-> G / gamepad-> Y)'}`;
    } else {
      this.gui.IntermissionSkipButton.Visible = false;
      this.canSkip = false;
    }
  }

  private onLastInputCategoryChanged(lastInputCategory: string): void {
    print(lastInputCategory);
    if (lastInputCategory === this.inputCategorizer.InputCategory.Touch) {
      this.enableTouchInput();
    } else {
      this.disableTouchInput();
      this.enableOtherInput();
    }
  }
}
