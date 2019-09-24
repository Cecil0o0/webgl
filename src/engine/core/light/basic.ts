import { vec3 } from 'gl-matrix';
import Object3D from '../object3d';

export class Light extends Object3D {
  color: vec3 = vec3.fromValues(1, 1, 1);
  intensity: number = 0.1;
  position: vec3 = vec3.fromValues(0, 0, 1);
  constructor(color?: vec3, intensity?: number, position?: vec3) {
    super();
    this._set(color, intensity, position);
  }
  set(color: vec3, intensity: number, position: vec3) {
    this._set(color, intensity, position);
  }
  _set(color: vec3, intensity: number, position: vec3) {
    if (color) this.color = color;
    if (intensity !== undefined) this.intensity = intensity;
    if (position) this.position = position;
  }
}
