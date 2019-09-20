import { Light } from './basic';
import { vec3 } from 'gl-matrix';

export class AmbientLight extends Light {
  constructor(color: vec3, intensity: number) {
    super(color, intensity);
  }
}
