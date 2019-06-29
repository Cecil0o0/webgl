export function addTapEventListener(element, handler) {
  const point = {};
  element.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    point.sx = touch.pageX;
    point.sy = touch.pageY;
    point.st = Date.now();
  });
  element.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    if (Math.abs(touch.pageX - point.sx) < 20 && Math.abs(touch.pageY - point.sy) < 20 && Date.now() - point.st < 300) {
      handler(e);
    }
  });
}

export function addDoubleTapEventListener(element, handler) {
  let time = 0;
  addTapEventListener(element, (e) => {
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

export function addDbclickEventListner(element, handler) {
  let time = 0;
  element.addEventListener('click', (e) => {
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
