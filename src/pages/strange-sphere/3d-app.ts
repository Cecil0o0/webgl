import { raf } from 'engine/animation';
import * as SNOWY from 'engine';
import { randomColor, deg2radian } from 'engine';
import { AmbientLight } from 'engine/core/light';
import { ColorArray } from 'types';
import { red, pink, blue, purple, cyan, yellow } from 'engine/colors';

let camera: SNOWY.OrthoCamera;
let scene: SNOWY.Scene;
let renderer: SNOWY.Renderer;
let radialLine: SNOWY.Model;
let sphere: SNOWY.Model;
export let ambientLight: AmbientLight;
let cube: SNOWY.Model;

export const manager = raf(animate, 60);
let ry = 0;
let ry1 = 0;
function animate() {
  let radian = deg2radian((ry += 5));
  let radian1 = deg2radian((ry1 += 20));
  radialLine.rotateY(radian);
  sphere.rotateY(radian);
  cube.rotateY(radian1);
  cube.rotateX(radian1);
  renderer.render(scene, camera);
}

export function setup() {
  renderer = new SNOWY.Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new SNOWY.Scene();

  const aspect = window.innerWidth / window.innerHeight;
  camera = new SNOWY.OrthoCamera(-aspect * 2, aspect * 2, -2, 2, -100, 100);

  const radialLineGeometry = new SNOWY.RadialLineGeometry();
  const colors: number[] = [];
  for (let i = 0; i < radialLineGeometry.indices.length; i++) {
    colors.push(...Object.values(randomColor()));
  }
  radialLine = new SNOWY.Model(radialLineGeometry, colors);
  radialLine.primitive = 'LINES';
  radialLine.translateY(-0.9);
  radialLine.scale(0.7, 0.7, 0.7);
  scene.add(radialLine);

  const sphereGeometry = new SNOWY.SphereGeometry(80, 8, 8);
  const colors1: number[] = [];
  for (let i = 0; i < sphereGeometry.indices.length; i++) {
    colors1.push(...Object.values(randomColor()));
  }
  sphere = new SNOWY.Model(sphereGeometry, colors1);
  sphere.primitive = 'LINES';
  sphere.translateY(0.9);
  scene.add(sphere);

  // 添加cube
  const cubeGeometry = new SNOWY.CubeGeometry(1, 1, 1);
  const colors2 = [];
  const preColors: ColorArray[] = [red, pink, blue, purple, cyan, yellow];
  for (let i = 0; i < cubeGeometry.indices.length; i++) {
    // 这里为什么取的是6，是因为每个面由两个三角形构成，一个三角形三个点，两个三角形六个点
    colors2.push(...preColors[Math.floor(i / 6)]);
  }
  cube = new SNOWY.Model(cubeGeometry, colors2);
  scene.add(cube);

  // 添加环境光
  ambientLight = new AmbientLight();
  scene.add(ambientLight);

  renderer.render(scene, camera);

  manager.start();
}
