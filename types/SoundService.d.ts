interface SoundService extends Instance {
  Audio: Folder & {
    MainFader: AudioFader & {
      Wire: Wire;
    };
    MainListener: AudioListener & {
      Wire: Wire;
    };
    Busses: Folder & {
      UI: Folder & {
        AudioCompressor: AudioCompressor & {
          Wire: Wire;
        };
        AudioEqualizer: AudioEqualizer & {
          Wire: Wire;
        };
        AudioFader: AudioFader & {
          Wire: Wire;
        };
      };
      World: Folder & {
        AudioCompressor: AudioCompressor & {
          Wire: Wire;
        };
        AudioEqualizer: AudioEqualizer & {
          Wire: Wire;
        };
        AudioFader: AudioFader & {
          Wire: Wire;
        };
      };
    };
    NPC: Folder & {
      Static: Folder;
      Enemy: Folder & {
        Eat: AudioPlayer;
        Death: AudioPlayer;
      };
    };
    MainOutput: AudioDeviceOutput;
  };
}
