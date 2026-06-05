interface PlayerGui extends BasePlayerGui {
  Main: ScreenGui & {
    Gameplay: Frame & {
      GunTouch: Frame & {
        Buttons: Frame & {
          InspectButton: TextButton & {
            UICorner: UICorner;
            IconLabel: ImageLabel;
          };
          ShootButton: TextButton & {
            UICorner: UICorner;
            IconLabel: ImageLabel;
          };
          UIScale: UIScale;
        };
      };
      HUD: Frame & {
        IntermissionSkipButton: Frame & {
          Label: TextLabel;
          Button: TextButton;
          UIStroke: UIStroke;
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UICorner: UICorner;
        };
        Stats: Frame & {
          Money: Frame & {
            UICorner: UICorner;
            UIStroke: UIStroke;
            Label: TextLabel;
          };
          Kills: Frame & {
            UICorner: UICorner;
            UIStroke: UIStroke;
            Label: TextLabel;
          };
          UIPadding: UIPadding;
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        Topbar: Frame & {
          RightLabel: Frame & {
            UICorner: UICorner;
            UIStroke: UIStroke;
            Label: TextLabel;
          };
          LeftLabel: Frame & {
            UICorner: UICorner;
            UIStroke: UIStroke;
            Label: TextLabel;
          };
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          BurgerWarning: Frame & {
            WarningImage: ImageLabel & {
              UIAspectRatioConstraint: UIAspectRatioConstraint;
            };
            Label: TextLabel;
            UICorner: UICorner;
            Gradient: Frame & {
              UIGradient: UIGradient;
            };
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            UIStroke: UIStroke;
          };
        };
      };
      GunReticleUI: Frame & {
        Reticle: Frame;
        Hitmarker: CanvasGroup & {
          UIPadding: UIPadding;
          UIScale: UIScale;
        };
      };
    };
    StyleLink: StyleLink;
    GunShop: Frame & {
      Preview: Frame & {
        GunName: TextLabel;
        StatsList: Frame & {
          Template: TextLabel;
          UIGridLayout: UIGridLayout & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
          };
        };
        GunIcon: ImageLabel;
        UICorner: UICorner;
        Buy: TextButton;
      };
      ToggleButton: Frame & {
        Button: TextButton;
        UIStroke: UIStroke;
        Title: TextLabel;
        UICorner: UICorner;
      };
      Title: TextLabel;
      List: ScrollingFrame & {
        UIGridLayout: UIGridLayout & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        Template: TextButton & {
          State: TextLabel;
          GunName: TextLabel;
          GunIcon: ImageLabel;
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          Slot: Frame & {
            UICorner: UICorner;
          };
        };
        UIPadding: UIPadding;
      };
      UICorner: UICorner;
      UIStroke: UIStroke;
      Icon: ImageLabel;
      Facade: Frame & {
        UIGradient: UIGradient;
      };
    };
    Underlay: Frame;
  };
}
