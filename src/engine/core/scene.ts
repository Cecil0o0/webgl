import Model from './model';
import { Light } from './light/basic';

export default class Scene {
  modelList: Model[] = [];
  lightList: Light[] = [];
  add(object: Model | Light) {
    if (object instanceof Model) {
      this.modelList.push(object);
    } else if (object instanceof Light) {
      this.lightList.push(object);
    } else {
      throw new Error("can't recognize object");
    }
  }
}
