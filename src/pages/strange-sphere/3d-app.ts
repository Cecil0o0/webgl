import { raf } from 'engine/animation';
import * as SNOWY from 'engine';
import { randomColor, deg2radian } from 'engine';

let camera: SNOWY.OrthoCamera;
let scene: SNOWY.Scene;
let renderer: SNOWY.Renderer;
let strangeSphereModel: SNOWY.Model;
let strangeSphere: SNOWY.StrangeSphere;

export const manager = raf(animate, 60);
let ry = 0;
function animate() {
  let radian = deg2radian((ry += 5));
  strangeSphere && strangeSphere.reCreate();
  strangeSphereModel.rotateY(radian);
  renderer.render(scene, camera);
}

export function setup() {
  renderer = new SNOWY.Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new SNOWY.Scene();

  const aspect = window.innerWidth / window.innerHeight;
  camera = new SNOWY.OrthoCamera(-aspect * 2, aspect * 2, -2, 2, -100, 100);

  const strangeSphere = new SNOWY.StrangeSphere();
  const colors: number[] = [];
  for (let i = 0; i < strangeSphere.indices.length; i++) {
    colors.push(...Object.values(randomColor()));
  }
  strangeSphereModel = new SNOWY.Model(strangeSphere, colors, undefined, {
    primitive: 'LINES'
  });
  scene.add(strangeSphereModel);

  // const sphereGeometry = new SNOWY.SphereGeometry(80, 8, 8);
  // const colors1: number[] = [];
  // for (let i = 0; i < sphereGeometry.indices.length; i++) {
  //   colors1.push(...Object.values(randomColor()));
  // }
  // sphere = new SNOWY.Model(sphereGeometry, colors1, undefined, {
  //   primitive: 'LINES'
  // });
  // scene.add(sphere);

  renderer.render(scene, camera);

  // manager.start();
}
