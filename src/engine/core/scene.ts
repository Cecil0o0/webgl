import Model from './model';

export default class Scene {
  objList: Model[] = [];
  add(object: Model): number {
    this.objList.push(object);
    return this.objList.length;
  }
}
