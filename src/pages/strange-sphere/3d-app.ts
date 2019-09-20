import { raf } from 'engine/animation';
import * as SNOWY from 'engine';
import { randomColor, deg2radian } from 'engine';
import { AmbientLight } from 'engine/core/light';
import { vec3 } from 'gl-matrix';

let camera: SNOWY.OrthoCamera;
let scene: SNOWY.Scene;
let renderer: SNOWY.Renderer;
let strangeSphereModel: SNOWY.Model;
let sphere: SNOWY.Model;
export let ambientLight: AmbientLight;

export const manager = raf(animate, 60);
let ry = 0;
function animate() {
  let radian = deg2radian((ry += 5));
  strangeSphereModel.rotateY(radian);
  sphere.rotateY(radian);
  renderer.render(scene, camera);
}

export function setup() {
  renderer = new SNOWY.Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new SNOWY.Scene();

  const aspect = window.innerWidth / window.innerHeight;
  camera = new SNOWY.OrthoCamera(-aspect * 2, aspect * 2, -2, 2, -100, 100);

  const strangeSphereGeometry = new SNOWY.StrangeSphereGeometry();
  const colors: number[] = [];
  for (let i = 0; i < strangeSphereGeometry.indices.length; i++) {
    colors.push(...Object.values(randomColor()));
  }
  strangeSphereModel = new SNOWY.Model(strangeSphereGeometry, colors);
  strangeSphereModel.primitive = 'LINES';
  strangeSphereModel.translateY(-0.9);
  strangeSphereModel.scale(0.7, 0.7, 0.7);
  scene.add(strangeSphereModel);

  const sphereGeometry = new SNOWY.SphereGeometry(80, 8, 8);
  const colors1: number[] = [];
  for (let i = 0; i < sphereGeometry.indices.length; i++) {
    colors1.push(...Object.values(randomColor()));
  }
  sphere = new SNOWY.Model(sphereGeometry, colors1);
  sphere.primitive = 'LINES';
  sphere.translateY(0.9);
  scene.add(sphere);

  // 添加环境光
  ambientLight = new AmbientLight(vec3.fromValues(255, 255, 255), 1);
  scene.add(ambientLight);

  renderer.render(scene, camera);

  manager.start();
}
