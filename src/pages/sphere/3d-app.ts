import CubeVertexShaderSource from 'shaders/basic/index.vert';
import CubeFragmentShaderSource from 'shaders/basic/index.frag';
import { setupCanvas } from 'engine';
import { genProgramWithShaderSource, clear } from 'engine/webgl-helper';
import { raf } from 'engine/animation';

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let aspect: number;
let u_Matrix: WebGLUniformLocation;

export let manager = raf(animate, 50);
function animate() {
}

export function render() {
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
