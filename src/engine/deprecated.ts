export function transformStartXY(x: number, y: number, vertices: number[], stride: number) {
  stride = stride || 6;
  for (let i = 0; i < vertices.length; i += stride) {
    vertices[i] += x;
  }
  for (let i = 1; i < vertices.length; i += stride) {
    vertices[i] += y;
  }
}
