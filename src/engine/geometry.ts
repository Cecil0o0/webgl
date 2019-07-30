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

  for (let f = 0; f < 6; f++) {
    // 处理6个面
    // 总顶点数
    const currFaceIndices = CUBE_FACE_INDICES[f];
    // 某一面颜色
    const color: ColorArray = CUBE_COLORS[f];
    for (let v = 0; v < 4; v++) {
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
 * 创建球体，默认用三角图元装配
 * 纬度平面顶点数首尾共用一个顶点
 * 即顶点总数为 (heightSegments - 1) * widthSegments + 2
 * 缺点是算法稍微复杂一些以及不能只能使用渐变色
 */
export function createSphere(radius: number, widthSegments: number, heightSegments: number) {
  radius = radius < 1 ? 1 : radius > 100 ? 100 : radius;

  const normalizeRadius = radius / 100;

  const vertices: number[] = [];
  const indices: number[] = [];
  const colors: ColorArray[] = [red, pink, blue, purple, cyan, yellow];
  const getColor = () => colors[randomRange(0, 5)]

  // generate vertices
  // 取边界
  const yUnitRadian = Math.PI / heightSegments;
  const perWidthRadian = 2 * Math.PI / widthSegments;
  // top vertex
  vertices.push(0, normalizeRadius, 0, ...getColor());
  for (let i = 1; i < heightSegments; i++) {
    const y = normalizeRadius * Math.cos(yUnitRadian * i);
    const perWidthRadius = normalizeRadius * Math.sin(yUnitRadian * i);
    // 为什么要倒着来？因为算出来的点的数字顺序刚好是三角形逆时针的绘制方向，便于后续处理
    for (let j = widthSegments - 1; j >= 0; j--) {
      const x = perWidthRadius * Math.cos(perWidthRadian * j);
      const z = perWidthRadius * Math.sin(perWidthRadian * j);
      vertices.push(x, y, z, ...getColor());
    }
  }
  // bottom vertex
  vertices.push(0, -normalizeRadius, 0, ...getColor())

  // generate indices
  for (let i = 1; i <= widthSegments; i++) {
    // 原理同下
    if (i === widthSegments) {
      indices.push(0, i, 1);
    } else {
      indices.push(0, i, i + 1)
    }
  }
  // for 找规律
  // indices.push(0,1,2)
  // indices.push(0,2,3)
  // indices.push(0,3,4)
  // indices.push(0,4,1)
  // indices.push(1,5,6)
  // indices.push(1,6,2)
  // indices.push(2,6,7)
  // indices.push(2,7,3)
  // indices.push(3,7,8)
  // indices.push(3,8,4)
  // indices.push(4,8,5)
  // indices.push(4,5,1)
  // 一般来说是CCW即逆时针绘制正面，因为webgl为提高性能默认启用背面剔除
  for(let i = 1; i < heightSegments - 1; i ++) {
    let start = (i - 1) * widthSegments;
    for(let j = 1; j <= widthSegments; j ++) {
      // 纬度上每一层会共用一个点做起始点（减少顶点数以降低显存），副作用是逻辑会较为复杂
      // 此等式表示纬度平面中最后一个顶点作为绘制三角形的起点
      if (j === widthSegments) {
        indices.push(
          start + j,
          start + j + widthSegments,
          start + 1 + widthSegments,
        );
        indices.push(
          start + j,
          start + 1 + widthSegments,
          start + 1
        );
      } else {
        indices.push(
          start + j,
          start + j + widthSegments,
          start + j + widthSegments + 1,
        );
        indices.push(
          start + j,
          start + j + widthSegments + 1,
          start + j + 1,
        )
      }
    }
  }
  const total = (heightSegments - 1) * widthSegments + 2;
  const last = total - 1;
  for(let i = 1; i <= widthSegments; i ++) {
    // 原理同上
    if (i === widthSegments) {
      indices.push(last, last - i, last - 1);
    } else {
      indices.push(last, last - i, last - 1 - i)
    }
  }

  return {
    indices: Uint8Array.from(indices),
    vertices: Float32Array.from(vertices)
  }
}
