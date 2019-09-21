import { Light } from './basic';
import { vec3 } from 'gl-matrix';

export class AmbientLight extends Light {
  constructor(...args: any) {
    super(...args);
  }
}
