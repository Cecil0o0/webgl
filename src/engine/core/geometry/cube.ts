import Geometry from './basic';

export class CubeGeometry extends Geometry {
  constructor(width: number, height: number, depth: number) {
    super();
    // 正方体 8 个顶点的坐标信息
    const zeroX = width / 2;
    const zeroY = height / 2;
    const zeroZ = depth / 2;
    const origins = [
      [-zeroX, -zeroY, zeroZ], // V0
      [zeroX, -zeroY, zeroZ], // V1
      [zeroX, zeroY, zeroZ], // V2
      [-zeroX, zeroY, zeroZ], // V3
      [-zeroX, -zeroY, -zeroZ], // V4
      [-zeroX, zeroY, -zeroZ], // V5
      [zeroX, zeroY, -zeroZ], // V6
      [zeroX, -zeroY, -zeroZ] // V7
    ];

    // 六个面索引
    const CUBE_FACE_INDICES = [
      [0, 1, 2, 3], // 前面
      [4, 5, 6, 7], // 后面
      [0, 3, 5, 4], // 左面
      [1, 7, 6, 2], // 右面
      [3, 2, 6, 5], // 上面
      [0, 4, 7, 1] // 下面
    ];

    // 六个面法向量
    const CUBE_FACE_NORMAL = [
      [0, 0, 1], // 前面
      [0, 0, -1], // 后面
      [-1, 0, 0], // 左面
      [1, 0, 0], // 右面
      [0, 1, 0], // 上面
      [0, -1, 0] // 下面
    ];

    let vertices: number[] = [];
    const indices: number[] = [];
    let normals: number[] = [];

    for (let f = 0; f < 6; f++) {
      // 处理6个面
      // 总顶点数
      const currFaceIndices = CUBE_FACE_INDICES[f];
      //
      const currFaceNormal = CUBE_FACE_NORMAL[f];
      // 某一面颜色
      for (let v = 0; v < 4; v++) {
        // 处理4个顶点
        // 3个浮点数表示一个顶点
        // 从裁剪坐标系转换到NDC坐标系
        vertices = vertices.concat(origins[currFaceIndices[v]]);
        // ?每一面一条法向量，为啥四个点都要对应到一条法向量呢
        normals = normals.concat(currFaceNormal);
      }
      // 画矩形需要4个顶点
      const offset = 4 * f;
      indices.push(offset + 0, offset + 1, offset + 2);
      indices.push(offset + 0, offset + 2, offset + 3);
    }

    this.positions = Float32Array.from(vertices);
    this.indices = Uint8Array.from(indices);
    this.normals = Float32Array.from(normals);
  }
}
