export class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  setX(x = 0) {
    this.x = x;
  }
  setY(y = 0) {
    this.y = y;
  }
  setZ(z = 0) {
    this.z = z;
  }
}

export class Vector2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  setX(x = 0) {
    this.x = x;
  }
  setY(y = 0) {
    this.y = y;
  }
}

export class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}
