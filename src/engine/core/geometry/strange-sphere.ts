import Geometry from './basic';
import { IndicesArray, PositionsArray } from 'types';

class StrangeSphere extends Geometry {
  indices: IndicesArray;
  positions: PositionsArray;
  constructor() {
    super();
    this.reCreate();
  }
  reCreate() {
    // 0点为中心点
    let positions = [0, 0, 0];
    let i = 0;
    while (i <= 1e4) {
      positions.push(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
      i++;
    }

    let pointNum = positions.length / 3;

    let indices = [];
    for (let i = 1; i < pointNum; i++) {
      indices.push(0, i);
    }

    this.indices = Uint8Array.from(indices);
    this.positions = Float32Array.from(positions);
  }
}

export { StrangeSphere };
