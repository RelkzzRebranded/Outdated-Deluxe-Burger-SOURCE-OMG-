import { Controller, OnStart } from '@flamework/core';
import { Janitor } from '@rbxts/janitor';
import { UserInputService } from '@rbxts/services';
import { TweenBuilder } from '@rbxts/twin';
import { mainScreen } from 'client/constants';

@Controller({})
export class GunReticleUIController {
  private enabled = false;
  private reticleUI = mainScreen.Gameplay.GunReticleUI;
  private hitmarkerScaleTween = TweenBuilder.for(this.reticleUI.Hitmarker.UIScale)
    .time(0.2)
    .style(Enum.EasingStyle.Back)
    .direction(Enum.EasingDirection.Out)
    .property('Scale', 1)
    .build();
  private hitmarkerTransparencyTween = TweenBuilder.for(this.reticleUI.Hitmarker)
    .time(0.3)
    .style(Enum.EasingStyle.Quad)
    .direction(Enum.EasingDirection.In)
    .property('GroupTransparency', 1)
    .build();
  public showHitmarker(): void {
    if (this.hitmarkerScaleTween.PlaybackState === Enum.PlaybackState.Playing)
      this.hitmarkerScaleTween.Cancel();
    if (this.hitmarkerTransparencyTween.PlaybackState === Enum.PlaybackState.Playing)
      this.hitmarkerTransparencyTween.Cancel();

    this.reticleUI.Hitmarker.GroupTransparency = 0;
    this.reticleUI.Hitmarker.UIScale.Scale = 2;

    this.hitmarkerScaleTween.Play();
    this.hitmarkerTransparencyTween.Play();
  }

  public enable(): void {
    if (this.enabled) return;
    this.enabled = true;
    this.reticleUI.Visible = true;

    UserInputService.MouseIconEnabled = false;
  }
  public disable(): void {
    if (!this.enabled) return;
    this.enabled = false;
    this.reticleUI.Visible = false;

    UserInputService.MouseIconEnabled = true;
  }

  public destroy(): void {
    this.disable();
  }
}
