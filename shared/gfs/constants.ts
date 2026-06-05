export const GUN_CONSTANTS = {
  RAY_EXCLUDE_TAG: 'RayExclude',
  NON_STATIC_TAG: 'NonStatic',
  FIRE_MODE: {
    SEMI: 'Semi',
    AUTO: 'Auto',
  },
  KEYBOARD_INSPECT_KEY_CODE: Enum.KeyCode.H,
  GAMEPAD_INSPECT_KEY_CODE: Enum.KeyCode.ButtonX,

  // Pixel size under which a screen is considered 'small'. This is the same threshold used by the default touch UI.
  UI_SMALL_SCREEN_THRESHOLD: 500,
  // Amount to scale the UI when on a small screen
  UI_SMALL_SCREEN_SCALE: 0.6,

  // Recoil
  RECOIL_BIND_NAME: 'Recoiler',
  RECOIL_STOP_SPEED: 10,
  // Arms
  VISIBLE_ARMS_BIND_NAME: 'VisibleArms',
} as const;
