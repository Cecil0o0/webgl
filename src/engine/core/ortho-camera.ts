import { Matrix } from 'types';
import { ortho } from 'engine/webgl-matrix';
import { mat4, vec3 } from 'gl-matrix';

export default class OrthoCamera {
  isOrthoCamera: boolean = true;
  projectionMatrix: Matrix;
  viewMatrix: mat4 = mat4.create();
  constructor(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number
  ) {
    // 投影矩阵
    this.projectionMatrix = ortho(left, right, top, bottom, near, far);
    // 视图矩阵
    mat4.lookAt(this.viewMatrix, vec3.create(), vec3.create(), vec3.create());
  }
}
