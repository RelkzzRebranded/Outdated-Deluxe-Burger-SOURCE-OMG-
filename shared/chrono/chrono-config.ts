import pvfx from 'shared/pvfx';

pvfx.emit(new Instance('Part'), {
  Count: 1,
  RepeatInterval: 1,
  Duration: 1,
  Target: new Instance('Part'), // example
});
