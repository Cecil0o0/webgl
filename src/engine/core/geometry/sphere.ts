import Geometry from './basic';

export class SphereGeometry extends Geometry {
  constructor(radius: number, widthSegments: number, heightSegments: number) {
    super();
    radius = radius < 1 ? 1 : radius > 100 ? 100 : radius;

    const normalizeRadius = radius / 100;

    const positions: number[] = [];
    const indices: number[] = [];

    // generate positions
    // 取边界
    const yUnitRadian = Math.PI / heightSegments;
    const perWidthRadian = (2 * Math.PI) / widthSegments;
    // top vertex
    positions.push(0, normalizeRadius, 0);
    for (let i = 1; i < heightSegments; i++) {
      const y = normalizeRadius * Math.cos(yUnitRadian * i);
      const perWidthRadius = normalizeRadius * Math.sin(yUnitRadian * i);
      // 为什么要倒着来？因为算出来的点的数字顺序刚好是三角形逆时针的绘制方向，便于后续处理
      for (let j = widthSegments - 1; j >= 0; j--) {
        const x = perWidthRadius * Math.cos(perWidthRadian * j);
        const z = perWidthRadius * Math.sin(perWidthRadian * j);
        positions.push(x, y, z);
      }
    }
    // bottom vertex
    positions.push(0, -normalizeRadius, 0);

    // generate indices
    for (let i = 1; i <= widthSegments; i++) {
      // 原理同下
      if (i === widthSegments) {
        indices.push(0, i, 1);
      } else {
        indices.push(0, i, i + 1);
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
    // 一般来说是CCW即逆时针绘制正面，因为webgl为提高性能默认（似乎没有，那就要手动启用啦）启用背面剔除
    for (let i = 1; i < heightSegments - 1; i++) {
      const start = (i - 1) * widthSegments;
      for (let j = 1; j <= widthSegments; j++) {
        // 纬度上每一层会共用一个点做起始点（减少顶点数以降低显存）
        // 副作用是逻辑比较复杂，为什么比较复杂是因为顶点共用，会导致在画三角形时遇到正反面问题和顶点回溯
        // 此等式表示纬度平面中最后一个顶点作为绘制三角形的起点
        if (j === widthSegments) {
          indices.push(
            start + j,
            start + j + widthSegments,
            start + 1 + widthSegments
          );
          indices.push(start + j, start + 1 + widthSegments, start + 1);
        } else {
          indices.push(
            start + j,
            start + j + widthSegments,
            start + j + widthSegments + 1
          );
          indices.push(start + j, start + j + widthSegments + 1, start + j + 1);
        }
      }
    }
    const total = (heightSegments - 1) * widthSegments + 2;
    const last = total - 1;
    for (let i = 1; i <= widthSegments; i++) {
      // 原理同上
      if (i === widthSegments) {
        indices.push(last, last - i, last - 1);
      } else {
        indices.push(last, last - i, last - 1 - i);
      }
    }

    this.indices = Uint8Array.from(indices);
    this.positions = Float32Array.from(positions);
  }
}
