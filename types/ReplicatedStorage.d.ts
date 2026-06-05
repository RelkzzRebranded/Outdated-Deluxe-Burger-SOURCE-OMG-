interface ReplicatedStorage extends Instance {
  Objects: Folder & {
    CharacterImpact: Part & {
      CircleEmitter: ParticleEmitter;
      SparkEmitter: ParticleEmitter;
    };
    EnvironmentImpact: Part & {
      CircleEmitter: ParticleEmitter;
      SparkEmitter: ParticleEmitter;
    };
    LaserBeam: Part & {
      StartAttachment: Attachment;
      EndAttachment: Attachment;
      CoreBeam: Beam;
    };
  };
  TS: ModuleScript & {
    utils: ModuleScript & {
      player: ModuleScript;
      math: ModuleScript;
      copy: ModuleScript;
      sound: ModuleScript;
      marketplace: ModuleScript & {
        utils: ModuleScript;
        types: ModuleScript;
      };
    };
    network: ModuleScript;
    gfs: Folder & {
      ['gfs-utils']: ModuleScript & {
        casting: ModuleScript;
        combat: ModuleScript;
        bindSoundToAnimEvents: ModuleScript;
      };
      replication: Folder & {
        ['shot-replication']: ModuleScript;
      };
      validation: ModuleScript;
      effects: Folder & {
        impactEffect: ModuleScript;
        beamEffect: ModuleScript;
      };
      constants: ModuleScript;
    };
    ['tree-definitions']: ModuleScript & {
      ['tool-definitions']: ModuleScript;
      ['player-definitions']: ModuleScript;
    };
    chrono: Folder & {
      ['chrono-config']: ModuleScript;
    };
    data: ModuleScript & {
      state: ModuleScript & {
        manager: ModuleScript;
        atom: ModuleScript;
      };
      utils: ModuleScript;
      types: ModuleScript;
      replication: ModuleScript & {
        replica: ModuleScript;
        types: ModuleScript;
      };
    };
    constants: ModuleScript;
    core: ModuleScript & {
      clock: ModuleScript;
    };
    pvfx: ModuleScript;
    game: ModuleScript & {
      types: ModuleScript;
      atom: ModuleScript;
      manager: ModuleScript;
      replication: ModuleScript & {
        replica: ModuleScript;
        types: ModuleScript;
      };
    };
    registry: Folder & {
      ['weapon-registry']: ModuleScript;
      ['content-registry']: ModuleScript;
      registry: ModuleScript;
      ['id-registry']: ModuleScript;
    };
  };
  Design: Folder & {
    BaseStyleSheet: StyleSheet & {
      ViewportFrame: StyleRule;
      CanvasGroup: StyleRule;
      UIListLayout: StyleRule;
      UIPageLayout: StyleRule;
      TextBox: StyleRule;
      VideoFrame: StyleRule;
      UITableLayout: StyleRule;
      UIGridLayout: StyleRule;
      TextLabel: StyleRule;
      ImageButton: StyleRule;
      TextButton: StyleRule;
      Frame: StyleRule;
      ScrollingFrame: StyleRule;
      ImageLabel: StyleRule;
    };
  };
  Assets: Folder & {
    Animation: Folder & {
      NPC: Folder & {
        Enemy: Folder & {
          BigNoob: Folder & {
            Idle: Animation;
            Walking: Animation;
            Attack: Animation;
          };
          Noob: Folder & {
            Idle: Animation;
            Walking: Animation;
            Attack: Animation;
          };
          FastNoob: Folder & {
            Idle: Animation;
            Walking: Animation;
            Attack: Animation;
          };
        };
        Static: Folder & {
          GunShop: Folder & {
            Idle: Animation;
          };
        };
      };
    };
    Weapons: Folder & {
      SCAR: Tool & {
        Animations: Folder & {
          Shoot: Animation;
          Inspect: Animation;
          Idle: Animation;
        };
        gun: Model & {
          Plane: MeshPart;
        };
        Handle: Part & {
          MuzzleAttachment: Attachment & {
            FlashEmitter: ParticleEmitter;
            PointLight: PointLight;
          };
          Plane: Motor6D;
          AudioEmitter: AudioEmitter;
        };
        Sounds: Folder & {
          Shoot: AudioPlayer;
          MagOut: AudioPlayer;
          Equip: AudioPlayer;
          Charger: AudioPlayer;
          MagIn: AudioPlayer;
        };
      };
      PipeGun: Tool & {
        Animations: Folder & {
          Shoot: Animation;
          Inspect: Animation;
          Idle: Animation;
        };
        gun: Model & {
          ['default']: MeshPart & {
            ['default']: Motor6D;
          };
        };
        Handle: Part & {
          AudioEmitter: AudioEmitter;
          MuzzleAttachment: Attachment & {
            FlashEmitter: ParticleEmitter;
            PointLight: PointLight;
          };
        };
        Sounds: Folder & {
          Shoot: AudioPlayer;
          MagOut: AudioPlayer;
          Equip: AudioPlayer;
          Charger: AudioPlayer;
          MagIn: AudioPlayer;
        };
      };
      PlasmaPistol: Tool & {
        Animations: Folder & {
          Shoot: Animation;
          Inspect: Animation;
          Idle: Animation;
        };
        gun: Model & {
          crystal: MeshPart & {
            texture: SurfaceAppearance;
          };
          meter: MeshPart & {
            texture: SurfaceAppearance;
          };
          emissive_artifact: MeshPart & {
            texture: SurfaceAppearance;
          };
          body: MeshPart & {
            ['body->emissive_artifact']: Motor6D;
            ['body->meter']: Motor6D;
            ['body->crystal']: Motor6D;
            texture: SurfaceAppearance;
          };
        };
        Handle: Part & {
          MuzzleAttachment: Attachment & {
            FlashEmitter: ParticleEmitter;
            PointLight: PointLight;
          };
          AudioEmitter: AudioEmitter;
          ['Handle->body']: Motor6D;
        };
        Sounds: Folder & {
          Shoot: AudioPlayer;
          MagOut: AudioPlayer;
          Equip: AudioPlayer;
          Charger: AudioPlayer;
          MagIn: AudioPlayer;
        };
      };
      PlasmaRifle: Tool & {
        Animations: Folder & {
          Shoot: Animation;
          Inspect: Animation;
          Idle: Animation;
        };
        PlasmaRifle: Model & {
          Handle: Part & {
            MuzzleAttachment: Attachment & {
              FlashEmitter: ParticleEmitter;
              PointLight: PointLight;
            };
            AudioEmitter: AudioEmitter;
            ['Handle->body']: Motor6D;
          };
          gun: Model & {
            crystal: MeshPart & {
              texture: SurfaceAppearance;
            };
            meter: MeshPart & {
              texture: SurfaceAppearance;
            };
            body: MeshPart & {
              ['body->crystal']: Motor6D;
              Weld: Weld;
              texture: SurfaceAppearance;
            };
          };
        };
        Sounds: Folder & {
          Shoot: AudioPlayer;
          MagOut: AudioPlayer;
          Equip: AudioPlayer;
          Charger: AudioPlayer;
          MagIn: AudioPlayer;
        };
      };
      M4A1: Tool & {
        Animations: Folder & {
          Shoot: Animation;
          Inspect: Animation;
          Idle: Animation;
        };
        gun: Model & {
          Cube: MeshPart & {
            Cube: Motor6D;
          };
        };
        Handle: Part & {
          AudioEmitter: AudioEmitter;
          MuzzleAttachment: Attachment & {
            FlashEmitter: ParticleEmitter;
            PointLight: PointLight;
          };
        };
        Sounds: Folder & {
          Shoot: AudioPlayer;
          MagOut: AudioPlayer;
          Equip: AudioPlayer;
          Charger: AudioPlayer;
          MagIn: AudioPlayer;
        };
      };
      Pistol: Tool & {
        Animations: Folder & {
          Shoot: Animation;
          Inspect: Animation;
          Idle: Animation;
        };
        gun: Model & {
          Trigger: MeshPart & {
            EasyWeld_handguard_to_Trigger: Weld;
          };
          TriggerGuard: MeshPart & {
            EasyWeld_handguard_to_TriggerGuard: Weld;
          };
          handguard: MeshPart & {
            EasyWeld_Handle_to_handguard: Motor6D;
          };
          Body: MeshPart & {
            EasyWeld_handguard_to_Body: Motor6D;
          };
        };
        Handle: Part & {
          AudioEmitter: AudioEmitter;
          MuzzleAttachment: Attachment & {
            FlashEmitter: ParticleEmitter;
            PointLight: PointLight;
          };
        };
        Sounds: Folder & {
          Shoot: AudioPlayer;
          MagOut: AudioPlayer;
          Equip: AudioPlayer;
          Charger: AudioPlayer;
          MagIn: AudioPlayer;
        };
      };
    };
  };
  PhaseVFXRuntime: ModuleScript & {
    RuntimeVisualTextures: ModuleScript;
    RuntimePerStopAttributes: ModuleScript;
    RuntimeLightning: ModuleScript;
    RuntimeNativeSupportRegistry: ModuleScript;
    RuntimeEmitterSequenceState: ModuleScript;
    RuntimeNativeEmit: ModuleScript;
    RuntimeMeshAttributes: ModuleScript;
    RuntimeFlipbookPlayback: ModuleScript;
    DebouncedCallback: ModuleScript;
    RuntimeNativePlaybackDuration: ModuleScript;
    RuntimeTargetTraversal: ModuleScript;
    RuntimeTweenEffect: ModuleScript;
    RuntimeKeyframeSplinePath: ModuleScript;
    RuntimeCustomEmitterRegistry: ModuleScript;
    RuntimeEmitterConfig: ModuleScript;
    RuntimeLightningBeamsStyle: ModuleScript;
    RuntimeDuration: ModuleScript;
    RuntimeEmitParams: ModuleScript;
    RuntimeEmitterSequences: ModuleScript;
    Signal: ModuleScript;
    RuntimeShockwaveCombo: ModuleScript;
    RuntimeFeatureType: ModuleScript;
    RuntimeCameraShake: ModuleScript;
    RuntimeSurfacePhysics: ModuleScript;
    RuntimeSpread: ModuleScript;
    RuntimeBezier: ModuleScript;
    RuntimeCustomDispatch: ModuleScript;
    RuntimeCurveData: ModuleScript;
    RuntimeEmitScheduler: ModuleScript;
    RuntimeConstants: ModuleScript;
    RuntimeTweenRoles: ModuleScript;
    RuntimeEnableState: ModuleScript;
    RuntimeShockwaveDebris: ModuleScript;
    RuntimeCraterField: ModuleScript;
    RuntimeBakedMeshEmitter: ModuleScript;
    VersionToken: ModuleScript;
    RuntimeBezierSegments: ModuleScript;
    RuntimeValueParsers: ModuleScript;
    ConnectionManager: ModuleScript;
    PerformanceProfiler: ModuleScript;
    RuntimeEmitOnFinish: ModuleScript;
    RuntimeScreenState: ModuleScript;
    RuntimeShockwave: ModuleScript;
    TaskQueue: ModuleScript;
    RuntimeVoxelBurst: ModuleScript;
    RuntimeEmitContainers: ModuleScript;
    RuntimeCustomMeshTweens: ModuleScript;
    RunLoopService: ModuleScript;
    RuntimePiecewise: ModuleScript;
    RuntimeCraterState: ModuleScript;
    RuntimeTemplateAttributes: ModuleScript;
    RuntimeOrigin: ModuleScript;
    RuntimeDust: ModuleScript;
    RuntimePartLikeTargets: ModuleScript;
    RuntimeAttributeAliases: ModuleScript;
    RuntimeSurfaceStyle: ModuleScript;
    RuntimeBezierCarrier: ModuleScript;
    RuntimeFlipbookSessions: ModuleScript;
    RuntimeTwinSpiralBezier: ModuleScript;
    RuntimeInstallConfig: ModuleScript;
    RuntimeMath: ModuleScript;
    RuntimeEffectRoots: ModuleScript;
    RuntimeSharedEndBezier: ModuleScript;
    RuntimePathNodes: ModuleScript;
    RuntimeScreenEffect: ModuleScript;
    RuntimeRock: ModuleScript;
    RuntimeHighlightTweens: ModuleScript;
    RuntimePreviewMarkers: ModuleScript;
    RuntimeBezierSequencer: ModuleScript;
    RuntimeEmitWithDepth: ModuleScript;
    RuntimeAssetIds: ModuleScript;
    RuntimePartLikeBurst: ModuleScript;
    RuntimeMeshDecal: ModuleScript;
    RuntimeShockwaveLine: ModuleScript;
    RuntimeShockwaveRing: ModuleScript;
    Maid: ModuleScript;
    RuntimeBezierImpactBurst: ModuleScript;
    RuntimeGeneration: ModuleScript;
    RuntimeSpin: ModuleScript;
    RuntimeContext: ModuleScript;
    RuntimePublicApi: ModuleScript;
    RuntimeFlipbookConfig: ModuleScript;
    RuntimeTweenRestorers: ModuleScript;
    RuntimeTransformActions: ModuleScript;
    RuntimeAttributeCache: ModuleScript;
  };
  rbxts_include: Folder & {
    RuntimeLib: ModuleScript;
    ['chrono-lua']: ModuleScript & {
      Client: Folder & {
        ModelResolver: ModuleScript;
        Player: ModuleScript;
        Receiver: ModuleScript;
        Sender: ModuleScript;
        Replicate: ModuleScript;
        InterpolationBuffer: ModuleScript;
        ClientClock: ModuleScript;
      };
      Shared: Folder & {
        ApplyMounts: ModuleScript;
        Stats: ModuleScript;
        Warn: ModuleScript;
        ModelHelper: ModuleScript;
        InterpolationMath: ModuleScript;
        Entity: ModuleScript;
        Ticker: ModuleScript;
        Bin: ModuleScript;
        _CUSTOM_MODEL_REP: Folder & {
          init: Model;
        };
        Snapshots: ModuleScript;
        Holder: ModuleScript;
        Config: ModuleScript;
        Events: ModuleScript;
        ReplicationRules: ModuleScript;
        Remotes: Folder & {
          ReplicateFull: RemoteEvent;
          ClientLoaded: RemoteEvent;
          Heartbeat: UnreliableRemoteEvent;
          Replicate: UnreliableRemoteEvent;
          Death: UnreliableRemoteEvent;
        };
        Types: ModuleScript;
        Signal: ModuleScript;
      };
      Server: Folder & {
        EntityGrid: ModuleScript;
        Player: ModuleScript;
        Receiver: ModuleScript;
        Replicate: ModuleScript;
        Sender: ModuleScript;
        ServerClock: ModuleScript;
      };
    };
    Promise: ModuleScript;
    node_modules: Folder & {
      ['@flamework']: Folder & {
        core: Folder & {
          out: ModuleScript & {
            utility: ModuleScript;
            flamework: ModuleScript;
            prelude: ModuleScript;
            reflect: ModuleScript;
            modding: ModuleScript;
            metadata: ModuleScript;
          };
        };
        components: Folder & {
          node_modules: Folder & {
            ['@rbxts']: Folder & {
              t: Folder & {
                lib: Folder & {
                  ts: ModuleScript;
                };
              };
            };
          };
          out: ModuleScript & {
            components: ModuleScript;
            baseComponent: ModuleScript;
            componentTracker: ModuleScript;
            utility: ModuleScript;
          };
        };
        networking: Folder & {
          out: ModuleScript & {
            ['function']: Folder & {
              createFunctionSender: ModuleScript;
              createFunctionReceiver: ModuleScript;
              errors: ModuleScript;
            };
            events: Folder & {
              createServerMethod: ModuleScript;
              createNetworkingEvent: ModuleScript;
              createGenericHandler: ModuleScript;
              createClientMethod: ModuleScript;
            };
            functions: Folder & {
              createServerMethod: ModuleScript;
              createNetworkingFunction: ModuleScript;
              createGenericHandler: ModuleScript;
              createClientMethod: ModuleScript;
            };
            util: Folder & {
              createSignalContainer: ModuleScript;
              getNamespaceConfig: ModuleScript;
              timeoutPromise: ModuleScript;
            };
            event: Folder & {
              createEvent: ModuleScript;
              createRemoteInstance: ModuleScript;
            };
            middleware: Folder & {
              createMiddlewareProcessor: ModuleScript;
              createGuardMiddleware: ModuleScript;
              skip: ModuleScript;
            };
          };
        };
      };
      ['@rbxts']: Folder & {
        remo: Folder & {
          src: ModuleScript & {
            getSender: ModuleScript;
            Promise: ModuleScript;
            builder: ModuleScript;
            constants: ModuleScript;
            utils: Folder & {
              compose: ModuleScript;
              testRemote: ModuleScript;
              mockRemotes: ModuleScript;
              unwrap: ModuleScript;
              instances: ModuleScript;
            };
            server: ModuleScript & {
              createRemote: ModuleScript;
              createAsyncRemote: ModuleScript;
            };
            container: Configuration;
            types: ModuleScript;
            client: ModuleScript & {
              createRemote: ModuleScript;
              createAsyncRemote: ModuleScript;
            };
            middleware: Folder & {
              loggerMiddleware: ModuleScript;
              throttleMiddleware: ModuleScript;
            };
            createRemotes: ModuleScript;
          };
        };
        charm: ModuleScript & {
          wally: ModuleScript;
          src: ModuleScript & {
            mapped: ModuleScript;
            computed: ModuleScript;
            atom: ModuleScript;
            effect: ModuleScript;
            observe: ModuleScript;
            subscribe: ModuleScript;
            store: ModuleScript;
            types: ModuleScript;
          };
        };
        tool_pack: ModuleScript & {
          array_tools: ModuleScript;
          physics_tools: ModuleScript;
          matrix_tools: ModuleScript;
          http_tools: ModuleScript;
          color_tools: ModuleScript;
          table_tools: ModuleScript;
          detecting_tools_2d: ModuleScript;
          instance_tools: ModuleScript;
          spline_tools: ModuleScript;
          function_tools: ModuleScript;
          string_tools: ModuleScript;
          gui_tools: ModuleScript;
          networking_tools: ModuleScript;
          cframe_tools: ModuleScript;
          detecting_tools: ModuleScript;
          classes: ModuleScript & {
            timers: ModuleScript & {
              flag_timer: ModuleScript;
              frame_timer: ModuleScript;
              callback_timer: ModuleScript;
              timer: ModuleScript;
            };
            vector: ModuleScript;
            animation: ModuleScript & {
              second_order_dynamics: ModuleScript & {
                second_order_dynamics: ModuleScript;
                second_order_dynamics_angle: ModuleScript;
                second_order_dynamics_number: ModuleScript;
              };
            };
          };
          vector3_tools: ModuleScript;
          vector2_tools: ModuleScript;
          math_tools: ModuleScript;
          debugging_tools: ModuleScript;
          tween_tools: ModuleScript;
          assets_tools: ModuleScript;
        };
        ripple: Folder & {
          src: ModuleScript & {
            tween: ModuleScript;
            config: ModuleScript;
            spring: ModuleScript;
            utils: Folder & {
              interpolate: ModuleScript;
              scheduler: ModuleScript;
              spawn: ModuleScript;
              signal: ModuleScript;
              oklab: ModuleScript;
              intermediate: ModuleScript;
              merge: ModuleScript;
            };
            types: ModuleScript;
            easing: ModuleScript;
            motion: ModuleScript;
          };
        };
        squash: Folder & {
          src: ModuleScript;
        };
        lapis: Folder & {
          out: ModuleScript & {
            Promise: ModuleScript;
            lapis: ModuleScript & {
              AutoSave: ModuleScript;
              freezeDeep: ModuleScript;
              noYield: ModuleScript;
              Internal: ModuleScript;
              Data: ModuleScript & {
                Throttle: ModuleScript;
              };
              ['init.test']: ModuleScript;
              Migration: ModuleScript;
              Config: ModuleScript;
              ['Document.test']: ModuleScript;
              PromiseTypes: ModuleScript;
              Collection: ModuleScript;
              copyDeep: ModuleScript;
              Error: ModuleScript;
              Document: ModuleScript;
            };
          };
        };
        quickzone: Folder & {
          src: ModuleScript & {
            Core: Folder & {
              State: ModuleScript;
              Scheduler: ModuleScript;
              PlayerTracker: ModuleScript;
            };
            Config: ModuleScript;
            Utils: Folder & {
              Log: ModuleScript;
              LinearBVH: ModuleScript;
              Geometry: ModuleScript;
            };
            Classes: Folder & {
              Observer: ModuleScript;
              Zones: ModuleScript;
              Group: ModuleScript;
              Zone: ModuleScript;
            };
            Types: ModuleScript;
          };
        };
        types: Folder & {
          include: Folder & {
            generated: Folder;
          };
        };
        t: Folder & {
          lib: Folder & {
            ts: ModuleScript;
          };
        };
        services: ModuleScript;
        twin: Folder & {
          out: ModuleScript;
        };
        animation: Folder & {
          out: ModuleScript;
        };
        beacon: Folder & {
          out: ModuleScript;
        };
        chrono: ModuleScript;
        ['compiler-types']: Folder & {
          types: Folder;
        };
        refx: Folder & {
          LICENSE: StringValue;
          out: ModuleScript & {
            baseEffect: ModuleScript;
            tests: Folder & {
              ['creation.spec']: ModuleScript;
              ['serverProxy.spec']: ModuleScript;
              ['clientProxy.spec']: ModuleScript;
            };
            configuration: ModuleScript;
            utilities: Folder & {
              idGenerator: ModuleScript;
              getModule: ModuleScript;
              logger: ModuleScript;
              instanceofConstructor: ModuleScript;
            };
            modules: Folder & {
              remo: ModuleScript;
              t: ModuleScript;
              signal: ModuleScript;
            };
            serverProxy: ModuleScript;
            wrapper: ModuleScript;
            remotes: ModuleScript;
            effectsMap: ModuleScript;
            client: ModuleScript & {
              entries: ModuleScript;
            };
            exports: ModuleScript;
            clientProxy: ModuleScript;
          };
        };
        maid: Folder & {
          Maid: ModuleScript;
        };
        ['state-management']: Folder & {
          out: ModuleScript & {
            BTCreator: ModuleScript;
            BehaviorTree: ModuleScript;
            ['goap.flat.index.wip']: ModuleScript;
            Goap: ModuleScript;
            FSM: ModuleScript;
            Blackboard: ModuleScript;
          };
        };
        ['input-actions']: ModuleScript & {
          Models: ModuleScript & {
            EInputEventSubscriptionType: ModuleScript;
            EMouseLockAction: ModuleScript;
            IActionData: ModuleScript;
            EMouseLockActionPriority: ModuleScript;
            InputKeyCode: ModuleScript;
            ECustomKey: ModuleScript;
            IInputMap: ModuleScript;
            EInputBufferIndex: ModuleScript;
            EInputDeviceType: ModuleScript;
            EDeviceType: ModuleScript;
            EInputType: ModuleScript;
            EVibrationPreset: ModuleScript;
            EDefaultInputAction: ModuleScript;
          };
          Utils: ModuleScript & {
            DeviceTypeHandler: ModuleScript;
            InputActionsInitializationHelper: ModuleScript;
            InputKeyCodeHelper: ModuleScript;
            RawInputHandler: ModuleScript & {
              CameraInput: ModuleScript & {
                ICameraInputModule: ModuleScript;
                FlagUtil: ModuleScript;
              };
              RawInputHandler: ModuleScript;
            };
            InputCatcher: ModuleScript;
          };
          UtilityTypes: Folder & {
            CleanUp: ModuleScript;
          };
          InternalUtils: Folder & {
            ThumbstickHelper: ModuleScript;
          };
          Resources: Folder & {
            ContextActionResources: ModuleScript;
            ActionResources: ModuleScript;
            InputPriorityResources: ModuleScript;
          };
          Controllers: ModuleScript & {
            InputManagerController: ModuleScript & {
              InputManagerController: ModuleScript;
              InputSignal: ModuleScript;
              InputEventData: ModuleScript;
              InputEvent: ModuleScript;
            };
            ActionsController: ModuleScript;
            InputConfigController: ModuleScript;
            InputEchoController: ModuleScript;
            HapticFeedbackController: ModuleScript;
            MouseController: ModuleScript;
            KeyCombinationController: ModuleScript;
            InputContextController: ModuleScript;
          };
        };
        ['object-utils']: ModuleScript;
        ['validate-tree']: ModuleScript;
        immut: Folder & {
          src: ModuleScript & {
            ['original.spec']: ModuleScript;
            ['finishDraft.spec']: ModuleScript;
            produce: ModuleScript;
            ['makeDraftSafe.spec']: ModuleScript;
            constants: ModuleScript;
            getClone: ModuleScript;
            table: ModuleScript;
            ['isDraftable.spec']: ModuleScript;
            original: ModuleScript;
            ['getClone.spec']: ModuleScript;
            isDraft: ModuleScript;
            makeDraftSafeReadOnly: ModuleScript;
            Draft: ModuleScript;
            finishDraft: ModuleScript;
            isDraftable: ModuleScript;
            ['makeDraftSafeReadOnly.spec']: ModuleScript;
            ['produce.spec']: ModuleScript;
            makeDraftSafe: ModuleScript;
            ['init.spec']: ModuleScript;
            ['Draft.spec']: ModuleScript;
            ['isDraft.spec']: ModuleScript;
            None: ModuleScript;
          };
        };
        janitor: Folder & {
          src: ModuleScript & {
            Promise: ModuleScript;
            FastDefer: ModuleScript;
          };
        };
        signal: ModuleScript;
      };
    };
  };
  FaceDecalFolder: Folder & {
    ['Basic  Face Pack']: Folder & {
      ['Dino Teeth']: StringValue;
      Crying: StringValue;
      Blinky: StringValue;
      ['Square Lenses']: StringValue;
      [':p']: StringValue;
      ['Monster Face']: StringValue;
      ['O.o']: StringValue;
      O_o: StringValue;
      [':[']: StringValue;
      ['D:']: StringValue;
      TX_Tiredface: StringValue;
      smiley: StringValue;
      TX_SpringWinkFace: StringValue;
      madface: StringValue;
      Hmmm: StringValue;
      Aggressive_Image: StringValue;
      ['Nethack face']: StringValue;
      ['Uh Oh']: StringValue;
      smug: StringValue;
      IMG_ShockedFace: StringValue;
      ['-_-']: StringValue;
      whatface: StringValue;
      Daring: StringValue;
      ['Football Face']: StringValue;
      qawr3: StringValue;
      Disbelief: StringValue;
      Stare: StringValue;
      ['happy face']: StringValue;
      IMG_BubbleFace: StringValue;
      dissapoint: StringValue;
      ['So Funny']: StringValue;
      ['Rawr!']: StringValue;
      Mischievous: StringValue;
      ItsGoTime: StringValue;
      qawr2: StringValue;
      FACE_TEMPLATE: StringValue;
      [':-/']: StringValue;
      ['Awesome Face_Image']: StringValue;
      qawr: StringValue;
      Glee: StringValue;
      ['On the verge']: StringValue;
      grr: StringValue;
      dnr: StringValue;
      IMG_NotSureIfface: StringValue;
      ['?']: StringValue;
      ['Rawr Face']: StringValue;
      Silly: StringValue;
      scaryface: StringValue;
      Anxious: StringValue;
      ZOMG: StringValue;
      ['Three Face']: StringValue;
      ['>< _']: StringValue;
      Stink: StringValue;
      Scarecrow: StringValue;
      Awkward: StringValue;
      Sweaty: StringValue;
      Silence: StringValue;
      YELL: StringValue;
      ['And then we take over the world']: StringValue;
      Sneak: StringValue;
      ['Are you sure?']: StringValue;
      unibrow: StringValue;
      ['Jack Frost Face_Image']: StringValue;
      FACE_TEMPLATE5: StringValue;
      Downcast: StringValue;
      Aghast: StringValue;
      Mysterious: StringValue;
      [':/']: StringValue;
      UhOh: StringValue;
      FACE_TEMPLATE4: StringValue;
      Chubs: StringValue;
      Cheeky: StringValue;
      ['Yawn Face']: StringValue;
      Fearless: StringValue;
      TX_SmugFace: StringValue;
      Anguished: StringValue;
      ['>:3']: StringValue;
    };
  };
  Enemies: Folder & {
    BigNoob: Model & {
      ['Left Leg']: Part & {
        LeftFootAttachment: Attachment;
      };
      Humanoid: Humanoid & {
        HumanoidDescription: HumanoidDescription;
        Animator: Animator;
      };
      ['Right Leg']: Part & {
        RightFootAttachment: Attachment;
      };
      Head: Part & {
        HatAttachment: Attachment;
        HairAttachment: Attachment;
        FaceFrontAttachment: Attachment;
        face: Decal;
        Mesh: SpecialMesh;
        FaceCenterAttachment: Attachment;
      };
      Torso: Part & {
        RightCollarAttachment: Attachment;
        WaistCenterAttachment: Attachment;
        BodyBackAttachment: Attachment;
        Neck: Motor6D;
        LeftCollarAttachment: Attachment;
        ['Left Hip']: Motor6D;
        ['Right Hip']: Motor6D;
        ['Left Shoulder']: Motor6D;
        ['Right Shoulder']: Motor6D;
        BodyFrontAttachment: Attachment;
        WaistBackAttachment: Attachment;
        WaistFrontAttachment: Attachment;
        NeckAttachment: Attachment;
      };
      HumanoidRootPart: Part & {
        RootJoint: Motor6D;
        RootAttachment: Attachment;
      };
      ['Right Arm']: Part & {
        RightShoulderAttachment: Attachment;
        RightGripAttachment: Attachment;
      };
      ['Left Arm']: Part & {
        LeftGripAttachment: Attachment;
        LeftShoulderAttachment: Attachment;
      };
      ['Body Colors']: BodyColors;
    };
    Noob: Model & {
      ['Left Leg']: Part & {
        LeftFootAttachment: Attachment;
      };
      Humanoid: Humanoid & {
        HumanoidDescription: HumanoidDescription;
        Animator: Animator;
      };
      ['Right Leg']: Part & {
        RightFootAttachment: Attachment;
      };
      Head: Part & {
        HatAttachment: Attachment;
        HairAttachment: Attachment;
        FaceFrontAttachment: Attachment;
        face: Decal;
        Mesh: SpecialMesh;
        FaceCenterAttachment: Attachment;
      };
      Torso: Part & {
        RightCollarAttachment: Attachment;
        WaistCenterAttachment: Attachment;
        BodyBackAttachment: Attachment;
        Neck: Motor6D;
        LeftCollarAttachment: Attachment;
        ['Left Hip']: Motor6D;
        ['Right Hip']: Motor6D;
        ['Left Shoulder']: Motor6D;
        ['Right Shoulder']: Motor6D;
        BodyFrontAttachment: Attachment;
        WaistBackAttachment: Attachment;
        WaistFrontAttachment: Attachment;
        NeckAttachment: Attachment;
      };
      HumanoidRootPart: Part & {
        RootJoint: Motor6D;
        RootAttachment: Attachment;
      };
      ['Right Arm']: Part & {
        RightShoulderAttachment: Attachment;
        RightGripAttachment: Attachment;
      };
      ['Left Arm']: Part & {
        LeftGripAttachment: Attachment;
        LeftShoulderAttachment: Attachment;
      };
      ['Body Colors']: BodyColors;
    };
    FastNoob: Model & {
      ['Left Leg']: Part & {
        LeftFootAttachment: Attachment;
      };
      Humanoid: Humanoid & {
        HumanoidDescription: HumanoidDescription;
        Animator: Animator;
      };
      ['Right Leg']: Part & {
        RightFootAttachment: Attachment;
      };
      Head: Part & {
        HatAttachment: Attachment;
        HairAttachment: Attachment;
        FaceFrontAttachment: Attachment;
        face: Decal;
        Mesh: SpecialMesh;
        FaceCenterAttachment: Attachment;
      };
      Torso: Part & {
        RightCollarAttachment: Attachment;
        WaistCenterAttachment: Attachment;
        BodyBackAttachment: Attachment;
        ParticleEmitter: ParticleEmitter;
        Neck: Motor6D;
        LeftCollarAttachment: Attachment;
        ['Left Hip']: Motor6D;
        ['Right Hip']: Motor6D;
        ['Left Shoulder']: Motor6D;
        ['Right Shoulder']: Motor6D;
        BodyFrontAttachment: Attachment;
        WaistBackAttachment: Attachment;
        WaistFrontAttachment: Attachment;
        NeckAttachment: Attachment;
      };
      HumanoidRootPart: Part & {
        RootJoint: Motor6D;
        RootAttachment: Attachment;
      };
      ['Right Arm']: Part & {
        RightShoulderAttachment: Attachment;
        RightGripAttachment: Attachment;
      };
      ['Left Arm']: Part & {
        LeftGripAttachment: Attachment;
        LeftShoulderAttachment: Attachment;
      };
      ['Body Colors']: BodyColors;
    };
  };
}
