/**
 * 透视投影变换矩阵
 */
export function perspectiveProjectionMatrix({ top, bottom, left, right, near, far }: { top: number, bottom: number, left: number, right: number, near: number, far: number }): Float32Array {
  const target: Float32Array = new Float32Array(16);

  // 第一行
  target[0] = 2 * near / (right - left);
  target[1] = 0;
  target[2] = (right + left) / (right - left);
  target[3] = 0;

  // 第二行
  target[4] = 0;
  target[5] = 2 * near / (top - bottom);
  target[6] = (top + bottom) / (top - bottom);
  target[7] = 0;

  // 第三行
  target[8] = 0;
  target[9] = 0;
  target[10] = -1 * (far + near) / (far - near);
  target[11] = -2 * far * near / (far - near);

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
export function getMatrixByFov(fov: number, aspect: number, near: number, far: number) {
  // 转角度制
  let top = near * Math.tan(fov * Math.PI / 180 / 2);
  let bottom = -top;
  let right = top * aspect;
  let left = -right;

  return perspectiveProjectionMatrix({
    top,
    bottom,
    right,
    left,
    near,
    far
  })
}
