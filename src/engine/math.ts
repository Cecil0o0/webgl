export function deg2radian(deg: number) {
  return Math.PI / 180 * deg;
}

export function radian2deg(radian: number) {
  return 180 * radian / Math.PI;
}

export function numberLimitRange(num: number, min: number, max: number): number {
  return num < min ? min : num > max ? max : num;
}

// 有限整数集的随机，包含边界
export const randomRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
