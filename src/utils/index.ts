export * from './tiny';

export function randomColor(): { r: number, g: number, b: number, a: number} {
  // 有限整数集的随机，包含边界
  const randomFunc = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return {
    // [0, 255]
    r: randomFunc(0, 255),
    g: randomFunc(0, 255),
    b: randomFunc(0, 255),
    // [0.5, 1)
    a: randomFunc(7, 9) / 10,
  };
}

export function isMobile(): string[] | [] {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

export function getPlainArr(arr: []) {
  return arr.reduce((acc, innerArray) => {
    acc = acc.concat(innerArray);
    return acc;
  }, []);
}

export function getDPR(): number {
  return window.devicePixelRatio || 1;
}

// canvas适配多倍屏
export function setupCanvas(canvas: HTMLCanvasElement): { width: number, height: number } {
  const DPR = getDPR() || 1;
  const {width, height} = canvas.getBoundingClientRect();
  canvas.width = width * DPR;
  canvas.height = height * DPR;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  return {
    width,
    height,
  };
}

export function transformStartXY(x: number, y: number, vertices: number[]) {
  const stride = 6;
  for (let i = 0; i < vertices.length; i += stride) {
    vertices[i] += x;
  }
  for (let i = 1; i < vertices.length; i += stride) {
    vertices[i] += y;
  }
}

export function deg2radian(deg: number) {
  return Math.PI / 180 * deg;
}

export function radian2deg(radian: number) {
  return 180 * radian / Math.PI;
}
