import {Matrix} from 'types';

/**
 *单位矩阵
 *
 * @param {*} target
 */
export function identity(target?: Matrix) {
  target = target || new Float32Array(16);
  for (let i = 0; i < 16; i++) {
    if (i % 5 == 0) {
      target[i] = 1;
    } else {
      target[i] = 0;
    }
  }
  return target;
}

/**
 * 透视投影变换矩阵
 */
export function perspectiveProjectionMatrix({
  top,
  bottom,
  left,
  right,
  near,
  far,
}: {
top: number;
bottom: number;
left: number;
right: number;
near: number;
far: number;
}): Float32Array {
  const target: Float32Array = new Float32Array(16);

  // 第一行
  target[0] = (2 * near) / (right - left);
  target[1] = 0;
  target[2] = (right + left) / (right - left);
  target[3] = 0;

  // 第二行
  target[4] = 0;
  target[5] = (2 * near) / (top - bottom);
  target[6] = (top + bottom) / (top - bottom);
  target[7] = 0;

  // 第三行
  target[8] = 0;
  target[9] = 0;
  target[10] = (-1 * (far + near)) / (far - near);
  target[11] = (-2 * far * near) / (far - near);

  // 第四行
  target[12] = 0;
  target[13] = 0;
  target[14] = -1;
  target[15] = 0;

  return target;
}

/**
 * 根据视角求矩阵
 */
export function getMatrixByFov(
    fov: number,
    aspect: number,
    near: number,
    far: number
) {
  // 转角度制
  const top = near * Math.tan((fov * Math.PI) / 180 / 2);
  const bottom = -top;
  const right = top * aspect;
  const left = -right;

  return perspectiveProjectionMatrix({
    top,
    bottom,
    right,
    left,
    near,
    far,
  });
}

/**
 *矩阵相乘  next * prev;
 */
export function multiply(next: Matrix, prev: Matrix, target?: Matrix) {
  target = target || new Float32Array(16);
  // 第一列
  const p00 = prev[0];
  const p10 = prev[1];
  const p20 = prev[2];
  const p30 = prev[3];
  // 第二列
  const p01 = prev[4];
  const p11 = prev[5];
  const p21 = prev[6];
  const p31 = prev[7];
  // 第三列
  const p02 = prev[8];
  const p12 = prev[9];
  const p22 = prev[10];
  const p32 = prev[11];

  // 第四列
  const p03 = prev[12];
  const p13 = prev[13];
  const p23 = prev[14];
  const p33 = prev[15];

  // 第一行
  const n00 = next[0];
  const n01 = next[4];
  const n02 = next[8];
  const n03 = next[12];
  // 第二行
  const n10 = next[1];
  const n11 = next[5];
  const n12 = next[9];
  const n13 = next[13];
  // 第三行
  const n20 = next[2];
  const n21 = next[6];
  const n22 = next[10];
  const n23 = next[14];

  // 第四行
  const n30 = next[3];
  const n31 = next[7];
  const n32 = next[11];
  const n33 = next[15];

  target[0] = p00 * n00 + p10 * n01 + p20 * n02 + p30 * n03;
  target[1] = p00 * n10 + p10 * n11 + p20 * n12 + p30 * n13;
  target[2] = p00 * n20 + p10 * n21 + p20 * n22 + p30 * n23;
  target[3] = p00 * n30 + p10 * n31 + p20 * n32 + p30 * n33;

  target[4] = p01 * n00 + p11 * n01 + p21 * n02 + p31 * n03;
  target[5] = p01 * n10 + p11 * n11 + p21 * n12 + p31 * n13;
  target[6] = p01 * n20 + p11 * n21 + p21 * n22 + p31 * n23;
  target[7] = p01 * n30 + p11 * n31 + p21 * n32 + p31 * n33;

  target[8] = p02 * n00 + p12 * n01 + p22 * n02 + p32 * n03;
  target[9] = p02 * n10 + p12 * n11 + p22 * n12 + p32 * n13;
  target[10] = p02 * n20 + p12 * n21 + p22 * n22 + p32 * n23;
  target[11] = p02 * n30 + p12 * n31 + p22 * n32 + p32 * n33;

  target[12] = p03 * n00 + p13 * n01 + p23 * n02 + p33 * n03;
  target[13] = p03 * n10 + p13 * n11 + p23 * n12 + p33 * n13;
  target[14] = p03 * n20 + p13 * n21 + p23 * n22 + p33 * n23;
  target[15] = p03 * n30 + p13 * n31 + p23 * n32 + p33 * n33;

  return target;
}

/**
 *正交投影矩阵
 *
 * @param {*} left
 * @param {*} right
 * @param {*} bottom
 * @param {*} top
 * @param {*} near
 * @param {*} far
 * @param {*} target
 * @returns
 */
export function ortho(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number,
    target?: Matrix
): Matrix {
  target = target || new Float32Array(16);

  target[0] = 2 / (right - left);
  target[1] = 0;
  target[2] = 0;
  target[3] = 0;

  target[4] = 0;
  target[5] = 2 / (top - bottom);
  target[6] = 0;
  target[7] = 0;

  target[8] = 0;
  target[9] = 0;
  target[10] = 2 / (near - far);
  target[11] = 0;

  target[12] = (left + right) / (left - right);
  target[13] = (bottom + top) / (bottom - top);
  target[14] = (near + far) / (near - far);
  target[15] = 1;

  return target;
}

export * from './transform-matrix';
