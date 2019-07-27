import {genShader, genProgram, clear} from 'engine/webgl-helper';
import triangleVertexShaderSource from './triangle.vert';
import triangleFragmentShaderSource from './triangle.frag';
import {setupCanvas} from 'engine';
import {WEBGL_TRIANGLE_TYPES} from './const';

export let canvas: HTMLCanvasElement;
export let gl: WebGLRenderingContext;

// triangle
let buffer;
let a_Position;
let triangleProgram;
let a_Color;

export function render({
  positions = [],
  triangleType = WEBGL_TRIANGLE_TYPES.TRIANGLES,
}: {
  positions?: [],
  triangleType?: WEBGL_TRIANGLE_TYPES
} = {}) {
  pushBufferData(positions);

  if (positions.length < 18) return;
  if (positions.length % 18 !== 0 && triangleType === WEBGL_TRIANGLE_TYPES.TRIANGLES) return
  clear(gl);

  // 绘制三角图元
  gl.drawArrays(gl[triangleType], 0, positions.length / 6);
}

export function pushBufferData(JSArray: number[] = []) {
  // 可以理解成WebGLBuffer读取的内存指针指向new Float32Array(JSArray)的内存起始地址
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(JSArray), gl.DYNAMIC_DRAW);
}

export function start() {
  canvas = document.querySelector('canvas');
  const {width, height} = setupCanvas(canvas);

  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // create a triangle vertex shader
  const vertexShader = genShader(gl, gl.VERTEX_SHADER, triangleVertexShaderSource);

  // create a fragment shader
  const fragmentShader = genShader(gl, gl.FRAGMENT_SHADER, triangleFragmentShaderSource);

  // create a triangle shader program
  triangleProgram = genProgram(gl, vertexShader, fragmentShader);

  // link the program
  gl.linkProgram(triangleProgram);

  // use the program
  gl.useProgram(triangleProgram);

  // create a buffer
  buffer = gl.createBuffer();

  // bind the buffer to gl.ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // find a_Position location
  a_Position = gl.getAttribLocation(triangleProgram, 'a_Position');

  // find a_Color location
  a_Color = gl.getAttribLocation(triangleProgram, 'a_Color');

  // find a_Screen_Size location
  const a_Screen_Size = gl.getAttribLocation(triangleProgram, 'a_Screen_Size');
  gl.vertexAttrib2f(a_Screen_Size, width, height);

  // 启用顶点属性的接收数组能力
  gl.enableVertexAttribArray(a_Position);

  // 设置attribute变量 a_Position 读取buffer的策略
  gl.vertexAttribPointer(
      a_Position,
      // size 单位是buffer一个单元，一个单元4字节
      2,
      gl.FLOAT,
      false,
      // stride 单位是字节
      24,
      0
  );

  // 启用顶点属性的接收数组能力
  gl.enableVertexAttribArray(a_Color);

  // 设置attribute变量 a_Color 读取buffer的策略
  gl.vertexAttribPointer(
    a_Color,
    4,
    gl.FLOAT,
    false,
    24,
    8
  )

  clear(gl);
}
