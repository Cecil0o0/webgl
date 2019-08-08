export function getDPR(): number {
  return window.devicePixelRatio || 1;
}

// canvas适配多倍屏
export function setupCanvas(canvas: HTMLCanvasElement): { width: number, height: number } {
  const DPR = getDPR();
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
