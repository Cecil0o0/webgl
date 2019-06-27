export function randomColor() {
  const randomFunc = (coefficient = 255) => Math.ceil(Math.random() * coefficient);
  return {
    r: randomFunc(),
    g: randomFunc(),
    b: randomFunc(),
    a: randomFunc(1) * .8
  };
}
