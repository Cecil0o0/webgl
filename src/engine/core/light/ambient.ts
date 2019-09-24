import { Light } from './basic';
import { vec3 } from 'gl-matrix';

export const defaultAmbientIntensity = 0.2;

export class AmbientLight extends Light {
  constructor(
    color: vec3 = vec3.fromValues(1, 1, 1),
    intensity: number = defaultAmbientIntensity,
    position: vec3 = vec3.fromValues(0, 0, 1)
  ) {
    super(color, intensity, position);
  }
}
