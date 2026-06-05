interface EmitOptions {
  Count?: number;
  Duration?: number;
  Target?: Instance;
  RepeatInterval?: number;
}

interface Api {
  emit: {
    (instance: Instance, options?: EmitOptions): void;
  };
}

declare const pvfx: Api;
export = pvfx;
