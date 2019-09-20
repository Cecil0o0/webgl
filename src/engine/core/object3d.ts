import { vec3 } from 'gl-matrix';

export default class Object3D {
  // 偏移
  translation = vec3.create();
  // 旋转角度
  // 角度制
  rotation = vec3.create();
  // 缩放
  scalation = vec3.fromValues(1, 1, 1);

  constructor() {}

  // 平移属性变换方法
  translateV(v3: vec3) {
    this.translation.set(v3, 0);
  }

  translate(x?: number, y?: number, z?: number) {
    this.translation.set([x, y, z], 0);
  }

  translateX(x = 0) {
    this.translation.set([x], 0);
  }

  translateY(y = 0) {
    this.translation.set([y], 1);
  }

  translateZ(z = 0) {
    this.translation.set([z], 2);
  }

  // 旋转属性变换方法
  rotateV(v3: vec3) {
    this.rotation.set(v3, 0);
  }

  rotate(x?: number, y?: number, z?: number) {
    this.rotation.set([x, y, z], 0);
  }

  rotateX(x = 0) {
    this.rotation.set([x], 0);
  }

  rotateY(y = 0) {
    this.rotation.set([y], 1);
  }

  rotateZ(z = 0) {
    this.rotation.set([z], 2);
  }

  // 缩放属性变换方法
  scaleV(v3: vec3) {
    this.scalation.set(v3, 0);
  }

  scale(x?: number, y?: number, z?: number) {
    this.scalation.set([x, y, z], 0);
  }

  scaleX(x = 0) {
    this.scalation.set([x], 0);
  }

  scaleY(y = 0) {
    this.scalation.set([y], 1);
  }

  scaleZ(z = 0) {
    this.scalation.set([z], 2);
  }
}
