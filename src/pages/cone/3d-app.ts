import CubeVertexShaderSource from 'shaders/basic/index.vert';
import CubeFragmentShaderSource from 'shaders/basic/index.frag';
import { setupCanvas, deg2radian } from 'engine';
import {
  genProgramWithShaderSource,
  clear,
  transformUnIndices
} from 'engine/webgl-helper';
import { raf } from 'engine/animation';
import { createCone } from 'engine/geometry';
import { GeometryElementData } from 'types';
import { mat4 } from 'gl-matrix';

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let aspect: number;
let m: mat4 = mat4.create();
let u_Matrix: WebGLUniformLocation;
let cone: GeometryElementData;
let verticesForDrawArray: Float32Array;

export let manager = raf(animate, 50);
let deg = 0;
function animate() {
  if (deg > 359) deg = 0;
  clear(gl);

  mat4.ortho(m, -aspect * 1.5, aspect * 1.5, -1.5, 1.5, -10, 100);
  mat4.rotateX(m, m, deg2radian((deg += 0.3)));
  mat4.rotateY(m, m, deg2radian((deg += 0.3)));

  gl.uniformMatrix4fv(u_Matrix, false, m);

  gl.drawArrays(gl.POINTS, 0, cone.vertices.length / 7);
  // gl.drawArrays(gl.TRIANGLES, 0 , verticesForDrawArray.length / 7 / 3);
  gl.drawElements(gl.TRIANGLES, cone.indices.length, gl.UNSIGNED_BYTE, 0);
}

export function render() {
  cone = createCone(0, 60, 8, 8, 100);

  // verticesForDrawArray = transformUnIndices(cone);
  console.log(cone);

  gl.bufferData(gl.ARRAY_BUFFER, cone.vertices, gl.DYNAMIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cone.indices, gl.DYNAMIC_DRAW);

  manager.start();
}

export function start() {
  canvas = document.querySelector('canvas');
  setupCanvas(canvas);
  aspect = canvas.width / canvas.height;
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  const program = genProgramWithShaderSource({
    gl,
    vertexShaderSource: CubeVertexShaderSource,
    fragmentShaderSource: CubeFragmentShaderSource
  });

  gl.useProgram(program);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);

  u_Matrix = gl.getUniformLocation(program, 'u_Matrix');
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_Color = gl.getAttribLocation(program, 'a_Color');
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_Color);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 28, 0);

  gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 28, 12);

  clear(gl);
}
