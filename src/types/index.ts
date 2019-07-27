export type VertexAttribPointerConfig = {
  size: number,
  type?: number,
  normalized?: boolean,
  stride?: number,
  offset?: number
}

export type ColorArray = [number, number, number, number]

export type Matrix = Float32Array;

export type GeometryElementData = {
  indices: Uint8Array,
  vertices: Float32Array
}
