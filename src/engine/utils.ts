import { randomRange } from './math';

export function isValid(variable: any) {
  return variable !== undefined && variable !== null;
}

export function randomColor(): { r: number; g: number; b: number; a: number } {
  return {
    // [0, 255]
    r: randomRange(0, 255),
    g: randomRange(0, 255),
    b: randomRange(0, 255),
    // [0.7, 0.9]
    a: randomRange(7, 9) / 10
  };
}

export function getPlainArr(arr: []) {
  return arr.reduce((acc, innerArray) => {
    acc = acc.concat(innerArray);
    return acc;
  }, []);
}

export function console_time(str: string) {
  if (process.env.NODE_ENV !== 'production') {
    // console.time(str)
  }
}

export function console_timeEnd(str: string) {
  if (process.env.NODE_ENV !== 'production') {
    // console.timeEnd(str)
  }
}
