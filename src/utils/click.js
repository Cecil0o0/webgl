export function addDbclickEventListner(element, handler) {
  let time = 0;
  const clickHandler = (e) => {
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
