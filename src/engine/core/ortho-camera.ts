import { Matrix } from "types";
import { ortho } from "engine/webgl-matrix";

export default class OrthoCamera {
  isOrthoCamera: boolean = true;
  matrix: Matrix;
  constructor(left: number, right: number, top: number, bootom: number, near: number, far: number) {
    this.matrix = ortho(left, right, top, bootom, near, far);
  }
}
