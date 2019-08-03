import {raf} from 'engine/animation';
import * as SNOWY from 'engine';
import {ortho} from 'engine/webgl-matrix';
import {randomColor} from 'engine';

let camera: SNOWY.OrthoCamera;
let scene: SNOWY.Scene;
let renderer: SNOWY.Renderer;
let sphereModel: SNOWY.Model;

export const manager = raf(animate, 60);
let rx = 1;
let ry = 1;
let tx = 0;
let dir = 1;
const ty = 0;
const sx = 1;
const sy = 1;
function animate() {
  sphereModel.rotateX((rx += 1));
  sphereModel.rotateY((ry -= 1));
  if (tx >= 1) dir = -1;
  if (tx <= -1) dir = +1;
  sphereModel.translateX((tx += 0.01 * dir));
  // sphereModel.translateY(ty -= 0.001);
  // sphereModel.scaleX(sx -= 0.001);
  // sphereModel.scaleY(sy += 0.001);
  renderer.render(scene);
}

export function setup() {
  renderer = new SNOWY.Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene = new SNOWY.Scene();
  const SphereGeometry = new SNOWY.SphereGeometry(80, 8, 8);
  const aspect = window.innerWidth / window.innerHeight;
  const colors = [];
  for (let i = 0; i < SphereGeometry.positions.length / 3; i++) {
    colors.push(...Object.values(randomColor()));
  }
  sphereModel = new SNOWY.Model(
      {
        attributes: {
          a_Position: {
            buffer: SphereGeometry.positions,
            floatNumsPerElement: 3,
          },
          a_Color: {
            buffer: Float32Array.from(colors),
          },
        },
        indices: SphereGeometry.indices,
      },
      {
        u_Matrix: ortho(-aspect * 2, aspect * 2, -2, 2, 100, -100),
      }
  );
  const sphere = new SNOWY.Object3D({
    model: sphereModel,
  });
  scene.add(sphere);
  const sphereModel2 = new SNOWY.Model(
      {
        attributes: {
          a_Position: {
            buffer: SphereGeometry.positions,
            floatNumsPerElement: 3,
          },
          a_Color: {
            buffer: Float32Array.from(colors),
          },
        },
        indices: SphereGeometry.indices,
      },
      {
        u_Matrix: ortho(-aspect * 2, aspect * 2, -2, 2, 100, -100),
      }
  );
  const sphere2 = new SNOWY.Object3D({
    model: sphereModel2,
  });
  scene.add(sphere2);
  sphereModel2.translate( -1, .5, 0 );
  renderer.render(scene);

  manager.start();
}
