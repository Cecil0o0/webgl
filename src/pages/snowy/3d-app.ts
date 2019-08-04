import {raf} from 'engine/animation';
import * as SNOWY from 'engine';
import {randomColor} from 'engine';

let camera: SNOWY.OrthoCamera;
let scene: SNOWY.Scene;
let renderer: SNOWY.Renderer;
let sphere: SNOWY.Model;
let spheres: SNOWY.Model[] = [];

export const manager = raf(animate, 60);
let rx = 1;
let ry = 1;
let tx = 0;
let dir = 1;
let s = 1;
let tdir = 1;
function animate() {
  sphere.rotateX((rx += 1));
  sphere.rotateY((ry -= 1));
  if (tx >= 1) dir = -1;
  if (tx <= -1) dir = +1;
  sphere.translateX((tx += 0.01 * dir));
  // sphere.translateY(ty -= 0.001);
  if (s >= 1) {
    tdir = -1
  } else if (s <= .5) {
    tdir = +1
  }
  s += 0.005 * tdir
  sphere.scaleX(s);
  sphere.scaleY(s);
  sphere.scaleZ(s);

  spheres.forEach(s => {
    s.rotateX(rx);
    s.rotateY(ry);
  })
  renderer.render(scene, camera);
}

export function setup() {
  renderer = new SNOWY.Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new SNOWY.Scene();

  const aspect = window.innerWidth / window.innerHeight;
  camera = new SNOWY.OrthoCamera(-aspect * 2, aspect * 2, -2, 2, 100, -100);

  const sphereGeometry = new SNOWY.SphereGeometry(80, 8, 8);
  const colors: number[] = [];
  for (let i = 0; i < sphereGeometry.indices.length; i++) {
    colors.push(...Object.values(randomColor()));
  }
  sphere = new SNOWY.Model(sphereGeometry, colors);


  for (let i = 0; i < 5; i++) {
    let sphereGeometry = new SNOWY.SphereGeometry((i+1) * 10, (i+5), (i+5));
    let color: number[] = [];
    for(let j = 0; j < sphereGeometry.indices.length; j++) {
      color.push(...Object.values(randomColor()));
    }
    let sphere = new SNOWY.Model(sphereGeometry, colors);
    sphere.translate(-i / 4, i /4 , 0)
    scene.add(sphere)
    spheres.push(sphere);
  }
  scene.add(sphere);

  manager.start();
}
