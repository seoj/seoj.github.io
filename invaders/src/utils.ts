export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randInt(min: number, max: number) {
  return Math.floor(rand(min, max));
}

export function pickRand<T>(arr: T[]) {
  return arr[randInt(0, arr.length)];
}
