import Object3D from './object3d';

export default class Scene {
  objList: Object3D[] = [];
  add(object: Object3D): number {
    this.objList.push(object);
    return this.objList.length;
  }
}
