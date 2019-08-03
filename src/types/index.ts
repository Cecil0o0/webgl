export type ColorArray = [number, number, number, number];
export type ColorsArray = Float32Array;
export type IndicesArray = Uint8Array | Uint16Array;
export type PositionsArray = Float32Array;

export type Matrix = Float32Array;

// 矩阵数据
export type GeometryElementData = {
  indices: Uint8Array;
  vertices: Float32Array;
};

// 缓冲区信息对象，有关顶点操作的所有信息
export type VertexBufferInfo = {
  buffer: WebGLBuffer;
  colors: Float32Array;
  vertices: PositionsArray;
  normals: Float32Array;
  indices: IndicesArray;
  texcoords: Float32Array;
};
