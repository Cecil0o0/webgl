import { vec3 } from 'gl-matrix';
import Object3D from '../object3d';

export class Light extends Object3D {
  color: vec3 = vec3.fromValues(255, 255, 255);
  intensity: number = 1;
  constructor(color: vec3, intensity: number) {
    super();
    this._set(color, intensity);
  }
  set(color: vec3, intensity: number) {
    this._set(color, intensity);
  }
  _set(color: vec3, intensity: number) {
    if (color) this.color = color;
    if (intensity !== undefined) this.intensity = intensity;
  }
}
