export function toFixed(num: number, precision: number, round = false) {
  switch (precision) {
    case math.huge:
      return num;
    case 0:
      return round ? math.round(num) : math.floor(num);
    default: {
      const augment = 10 ** precision;
      return math.floor(num * augment + (round ? 0.5 : 0)) / augment;
    }
  }
}
