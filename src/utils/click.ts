export function addDbclickEventListner(element: HTMLElement, handler: EventListener): Function {
  let time = 0;
  const clickHandler: EventListener = (e: Event) => {
    time ++;
    const timer = setTimeout(() => {
      time = 0;
      clearTimeout(timer);
    }, 300);
    if (time === 2) {
      clearTimeout(timer);
      handler(e);
    }
  };
  element.addEventListener('click', clickHandler);
  return () => {
    element.removeEventListener('click', clickHandler);
  };
}
