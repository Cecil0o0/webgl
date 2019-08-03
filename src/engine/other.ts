export function isMobile(): string[] | [] {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

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
