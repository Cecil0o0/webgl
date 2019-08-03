import CubeVertexShaderSource from 'shaders/basic/index.vert';
import CubeFragmentShaderSource from 'shaders/basic/index.frag';
import { setupCanvas, deg2radian } from 'engine';
import { genProgramWithShaderSource, clear } from 'engine/webgl-helper';
import { ortho, rotateY, rotateX } from 'engine/webgl-matrix';
import { raf } from 'engine/animation';
import { Matrix } from 'types';
import { createCube } from 'engine/geometry';

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let matrix: Matrix;
let u_Matrix: WebGLUniformLocation;
let aspect: number;

let cube: {
  indices?: Uint8Array,
  vertices?: Float32Array
} = {};

let deg = 3;
export let manager = raf(animate, 60);
function animate() {
  if (deg > 359) deg = 0;
  clear(gl);
  matrix = ortho(-aspect * 3, aspect * 3, -3, 3, 100, -100);
  matrix = rotateY(matrix, deg2radian(deg += .4))
  matrix = rotateX(matrix, deg2radian(deg += .4))
  gl.uniformMatrix4fv(u_Matrix, false, matrix);
  gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_BYTE, 0);
}

export function render() {
  const { indices, vertices } = createCube(1, 1, 1);
  cube.indices = indices;
  cube.vertices = vertices;
  gl.enable(gl.CULL_FACE);

  // 啥都不说，直接复制数据到缓存区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  manager.start()
}

export function start() {
  canvas = document.querySelector('canvas');
  setupCanvas(canvas);
  aspect = canvas.width / canvas.height
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  const program = genProgramWithShaderSource({
    gl,
    vertexShaderSource: CubeVertexShaderSource,
    fragmentShaderSource: CubeFragmentShaderSource
  })

  gl.useProgram(program);

  u_Matrix = gl.getUniformLocation(program, 'u_Matrix');
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_Color = gl.getAttribLocation(program, 'a_Color');
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_Color);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

  gl.vertexAttribPointer(
    a_Position,
    3,
    gl.FLOAT,
    false,
    28,
    0
  )

  gl.vertexAttribPointer(
    a_Color,
    4,
    gl.FLOAT,
    false,
    28,
    12
  )

  clear(gl);
}
