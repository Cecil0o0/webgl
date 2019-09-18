import CubeVertexShaderSource from 'shaders/basic/index.vert';
import CubeFragmentShaderSource from 'shaders/basic/index.frag';
import { setupCanvas, deg2radian } from 'engine';
import { genProgramWithShaderSource, clear } from 'engine/webgl-helper';
import { raf } from 'engine/animation';
import { createSphere } from 'engine/geometry';
import { Matrix, GeometryElementData } from 'types';
import { ortho, rotateX, rotateY } from 'engine/webgl-matrix';
import Stats from 'stats.js';

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let aspect: number;
let u_Matrix: WebGLUniformLocation;
let matrix: Matrix;
let sphere: GeometryElementData;
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

let deg = 1;
export let manager = raf(animate, 60);
function animate() {
  stats.begin();
  if (deg > 359) deg = 0;
  clear(gl);

  matrix = ortho(-aspect * 2.5, aspect * 2.5, -2.5, 2.5, 100, -100);
  rotateX(matrix, deg2radian((deg += 0.3)), matrix);
  rotateY(matrix, deg2radian((deg += 0.3)), matrix);
  gl.uniformMatrix4fv(u_Matrix, false, matrix);

  gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_BYTE, 0);
  gl.drawArrays(gl.POINTS, 0, sphere.vertices.length / 7);
  stats.end();
}

export function render() {
  sphere = createSphere(160, 12, 12);

  gl.bufferData(gl.ARRAY_BUFFER, sphere.vertices, gl.DYNAMIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.DYNAMIC_DRAW);
  manager.start();
}

export function start() {
  canvas = document.querySelector('canvas');
  setupCanvas(canvas);
  aspect = canvas.width / canvas.height;
  gl = canvas.getContext('webgl');

  const program = genProgramWithShaderSource({
    gl,
    vertexShaderSource: CubeVertexShaderSource,
    fragmentShaderSource: CubeFragmentShaderSource
  });

  gl.useProgram(program);
  gl.enable(gl.CULL_FACE);

  u_Matrix = gl.getUniformLocation(program, 'u_Matrix');
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_Color = gl.getAttribLocation(program, 'a_Color');
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_Color);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

  // 必须要bindBuffer才可以调用该方法
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 28, 0);

  gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 28, 12);

  clear(gl);
}
