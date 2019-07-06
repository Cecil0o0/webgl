export function randomColor() {
  // 有限整数集的随机，包含边界
  const randomFunc = (min, max) => {
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

export function isMobile() {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

export function getPlainArr(arr) {
  return arr.reduce((acc, innerArray) => {
    acc = acc.concat(innerArray);
    return acc;
  }, []);
}
