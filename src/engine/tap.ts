export function addTapEventListener(element: HTMLElement, handler: EventListener): Function {
  const point: { sx?: number, sy?: number, st?: number} = {};
  const touchstartHandler = (e: TouchEvent) => {
    const touch = e.touches[0];
    point.sx = touch.pageX;
    point.sy = touch.pageY;
    point.st = Date.now();
  };
  const touchendHandler = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    if (Math.abs(touch.pageX - point.sx) < 20 && Math.abs(touch.pageY - point.sy) < 20 && Date.now() - point.st < 300) {
      handler(e);
    }
  };
  element.addEventListener('touchstart', touchstartHandler);
  element.addEventListener('touchend', touchendHandler);
  return () => {
    element.removeEventListener('touchstart', touchstartHandler);
    element.removeEventListener('touchend', touchendHandler);
  };
}

export function addDoubleTapEventListener(element: HTMLElement, handler: EventListener): Function {
  let time = 0;
  return addTapEventListener(element, (e: TouchEvent) => {
    time ++;
    const timer = setTimeout(() => {
      time = 0;
      clearTimeout(timer);
    }, 300);
    if (time === 2) {
      clearTimeout(timer);
      handler(e);
    }
  });
}
