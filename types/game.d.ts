interface WeaponButton extends TextButton {
  State: TextLabel;
  GunName: TextLabel;
  GunIcon: ImageLabel;
  Slot: Frame & {
    UICorner: UICorner;
  };
}
