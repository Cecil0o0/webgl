import { Matrix } from 'types';

/**
 * 缩放矩阵
 */
export function scale(m: Matrix, sx: number, sy: number, sz: number, target: Matrix) {
  target = target || new Float32Array(16);

  target[0] = sx * m[0 * 4 + 0];
  target[1] = sx * m[0 * 4 + 1];
  target[2] = sx * m[0 * 4 + 2];
  target[3] = sx * m[0 * 4 + 3];
  target[4] = sy * m[1 * 4 + 0];
  target[5] = sy * m[1 * 4 + 1];
  target[6] = sy * m[1 * 4 + 2];
  target[7] = sy * m[1 * 4 + 3];
  target[8] = sz * m[2 * 4 + 0];
  target[9] = sz * m[2 * 4 + 1];
  target[10] = sz * m[2 * 4 + 2];
  target[11] = sz * m[2 * 4 + 3];

  target[12] = m[12];
  target[13] = m[13];
  target[14] = m[14];
  target[15] = m[15];

  return target;
}

/**
 * 绕X轴旋转
 */
export function rotateX(m: Matrix, radian: number, target?: Matrix) {
  target = target || new Float32Array(16);

  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);

  target[4] = cos * m10 + sin * m20;
  target[5] = cos * m11 + sin * m21;
  target[6] = cos * m12 + sin * m22;
  target[7] = cos * m13 + sin * m23;
  target[8] = cos * m20 - sin * m10;
  target[9] = cos * m21 - sin * m11;
  target[10] = cos * m22 - sin * m12;
  target[11] = cos * m23 - sin * m13;

  if (m !== target) {
    target[0] = m[0];
    target[1] = m[1];
    target[2] = m[2];
    target[3] = m[3];
    target[12] = m[12];
    target[13] = m[13];
    target[14] = m[14];
    target[15] = m[15];
  }

  return target;
}

/**
 * 绕Y轴旋转
 */
export function rotateY(m: Matrix, radian: number, target?: Matrix) {
  target = target || new Float32Array(16);

  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);

  target[0] = cos * m00 - sin * m20;
  target[1] = cos * m01 - sin * m21;
  target[2] = cos * m02 - sin * m22;
  target[3] = cos * m03 - sin * m23;
  target[8] = cos * m20 + sin * m00;
  target[9] = cos * m21 + sin * m01;
  target[10] = cos * m22 + sin * m02;
  target[11] = cos * m23 + sin * m03;

  if (m !== target) {
    target[4] = m[4];
    target[5] = m[5];
    target[6] = m[6];
    target[7] = m[7];
    target[12] = m[12];
    target[13] = m[13];
    target[14] = m[14];
    target[15] = m[15];
  }

  return target;
}

/**
 * 绕Z轴旋转
 */
export function rotateZ(m: Matrix, radian: number, target: Matrix) {
  target = target || new Float32Array(16);

  var m00 = m[0];
  var m01 = m[1];
  var m02 = m[2];
  var m03 = m[3];
  var m10 = m[4];
  var m11 = m[5];
  var m12 = m[6];
  var m13 = m[7];

  var cos = Math.cos(radian);
  var sin = Math.sin(radian);

  target[0] = cos * m00 + sin * m10;
  target[1] = cos * m01 + sin * m11;
  target[2] = cos * m02 + sin * m12;
  target[3] = cos * m03 + sin * m13;
  target[4] = cos * m10 - sin * m00;
  target[5] = cos * m11 - sin * m01;
  target[6] = cos * m12 - sin * m02;
  target[7] = cos * m13 - sin * m03;

  if (m !== target) {
    target[8] = m[8];
    target[9] = m[9];
    target[10] = m[10];
    target[11] = m[11];
    target[12] = m[12];
    target[13] = m[13];
    target[14] = m[14];
    target[15] = m[15];
  }

  return target;
}

/**
 *先平移，再执行 m 的合成矩阵。
  */
export function translate(m: Matrix, tx: number, ty: number, tz: number, target: Matrix) {
  target = target || new Float32Array(16);

  //第一列
  var m0 = m[0];
  var m1 = m[1];
  var m2 = m[2];
  var m3 = m[3];

  //第二列
  var m4 = m[4];
  var m5 = m[5];
  var m6 = m[6];
  var m7 = m[7];

  //第三列
  var m8 = m[8];
  var m9 = m[9];
  var m10 = m[10];
  var m11 = m[11];
  //第四列
  var m12 = m[12];
  var m13 = m[13];
  var m14 = m[14];
  var m15 = m[15];
  if (m !== target) {
    for (var i = 0; i < 12; i++) {
      target[i] = m[i];
    }
  }

  target[12] = m0 * tx + m4 * ty + m8 * tz + m12;
  target[13] = m1 * tx + m5 * ty + m9 * tz + m13;
  target[14] = m2 * tx + m6 * ty + m10 * tz + m14;
  target[15] = m3 * tx + m7 * ty + m11 * tz + m15;

  return target;
}
