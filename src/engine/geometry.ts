import { ColorArray } from "types";
import { red, pink, blue, purple, cyan, yellow } from './colors';
import { randomRange } from "engine";

/**
 * 通过宽度、高度、深度创建立方体顶点数组以及元素索引数组
 * 后续可通过gl.drawArrays 或 gl.drawwElements绘制
 * @param width
 * @param height
 * @param depth
 */
export function createCube(width: number, height: number, depth: number) {
  //正方体 8 个顶点的坐标信息
  let zeroX = width / 2;
  let zeroY = height / 2;
  let zeroZ = depth / 2;
  const positions: [number, number, number][] = [
    [-zeroX, -zeroY, zeroZ],  //V0
    [zeroX, -zeroY, zeroZ],  //V1
    [zeroX, zeroY, zeroZ],   //V2
    [-zeroX, zeroY, zeroZ],  //V3
    [-zeroX, -zeroY, -zeroZ],//V4
    [-zeroX, zeroY, -zeroZ], //V5
    [zeroX, zeroY, -zeroZ],  //V6
    [zeroX, -zeroY, -zeroZ]  //V7
  ]

  // 六个面索引
  const CUBE_FACE_INDICES: [number, number, number, number][] = [
    [0, 1, 2, 3], //前面
    [4, 5, 6, 7], //后面
    [0, 3, 5, 4], //左面
    [1, 7, 6, 2], //右面
    [3, 2, 6, 5], //上面
    [0, 4, 7, 1] // 下面
  ];

  // 六个面颜色
  const CUBE_COLORS: ColorArray[] = [
    red, // 前
    purple, // 后
    yellow, // 左
    cyan, // 右
    pink, // 上
    blue  // 下
  ]

  let vertices: number[] = [];
  let indices: number[] = [];

  for(let f = 0; f < 6; f++) {
    // 处理6个面
    // 总顶点数
    const currFaceIndices = CUBE_FACE_INDICES[f];
    // 某一面颜色
    const color: ColorArray = CUBE_COLORS[f];
    for(let v = 0; v < 4; v++) {
      // 处理4个顶点
      // 3个浮点数表示一个顶点
      // 从裁剪坐标系转换到NDC坐标系
      let someVertices = positions[currFaceIndices[v]];
      vertices = vertices.concat(someVertices, color);
    }
    // 画矩形需要4个顶点
    let offset = 4 * f;
    indices.push(offset + 0, offset + 1, offset + 2);
    indices.push(offset + 0, offset + 2, offset + 3);
  }

  return {
    indices: new Uint8Array(indices),
    vertices: new Float32Array(vertices)
  }
}

/**
 * 创建球体
 */
export function createSphere(radius: number, widthSegments: number, heightSegments: number) {
  radius = radius < 1 ? 1 : radius > 100 ? 100 : radius;

  const normalizeRadius = radius / 100;

  const vertices: number[] = [];
  const indices: number[] = [];
  const colors: ColorArray[] = [red, pink, blue, purple, cyan, yellow];

  // generate vertices
  // 取边界
  const yUnitRadian = Math.PI / heightSegments;
  for(let i = 0; i <= heightSegments; i++) {
    const y = normalizeRadius * Math.cos(yUnitRadian * i);
    const perWidthRadian = 2 * Math.PI / widthSegments;
    const perWidthRadius = normalizeRadius * Math.sin(yUnitRadian * i);
    for(let j = 0; j <= widthSegments; j++) {
      const x = perWidthRadius * Math.cos(perWidthRadian * j);
      const z = perWidthRadius * Math.sin(perWidthRadian * j);
      vertices.push(x, y, z, ...colors[randomRange(0, 5)]);
    }
  }

  // generate indices
  // 不取边界是因为三角形需要上下两层的顶点来画，而最后一层没有下一层所以不需要取边界
  for(let i = 0; i <= heightSegments; i ++) {
    for(let j = 0; j < widthSegments; j ++) {
      indices.push(
        i * widthSegments + j,
        (i + 1) * widthSegments + j,
        (i + 1) * widthSegments + j + 1
      );
      indices.push(
        i * widthSegments + j,
        (i + 1) * widthSegments + j + 1,
        i * widthSegments + j + 1
      )
    }
  }

  return {
    indices: Uint8Array.from(indices),
    vertices: Float32Array.from(vertices)
  }
}
