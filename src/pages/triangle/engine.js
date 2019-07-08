import {genShader, genProgram, clear} from 'webgl-helper';
import triangleVertexShaderSource from './triangle.vert';
import triangleFragmentShaderSource from './triangle.frag';
import {randomColor, setupCanvas} from 'utils';
import {WEBGL_TRIANGLE_TYPES_ENUM} from './const';

export let canvas;
export let gl;

// triangle
export let buffer;
export let a_Position;
export let u_Color;
export let triangleProgram;

export function render({
  positions = [],
  triangleType = WEBGL_TRIANGLE_TYPES_ENUM.TRIANGLES,
} = {}) {
  // 往缓冲区复制数据
  pushBufferData(positions);

  clear(gl);

  const {r, g, b, a} = randomColor();

  // 给 u_Color 赋值
  gl.uniform4f(u_Color, r, g, b, a);

  // 绘制三角图元
  gl.drawArrays(gl[triangleType], 0, positions.length / 2);
}

export function pushBufferData(JSArray = []) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(JSArray), gl.DYNAMIC_DRAW);
}

export function boot() {
  canvas = document.querySelector('canvas');
  const {width, height} = setupCanvas(canvas);

  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // create a triangle vertex shader
  const vertexShader = genShader(gl, gl.VERTEX_SHADER, triangleVertexShaderSource);

  // create a fragment shader
  const fragmentShader = genShader(gl, gl.FRAGMENT_SHADER, triangleFragmentShaderSource);

  // create a triangle shader program
  triangleProgram = genProgram(gl, vertexShader, fragmentShader);

  // link programs
  gl.linkProgram(triangleProgram);

  // use the program
  gl.useProgram(triangleProgram);

  // create a buffer
  buffer = gl.createBuffer();

  // bind the buffer to gl.ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // find u_Color pointer
  u_Color = gl.getUniformLocation(triangleProgram, 'u_Color');

  // find a_Position pointer
  a_Position = gl.getAttribLocation(triangleProgram, 'a_Position');

  // find a_Screen_Size pointer
  const a_Screen_Size = gl.getAttribLocation(triangleProgram, 'a_Screen_Size');
  gl.vertexAttrib2f(a_Screen_Size, width, height);

  // 启用顶点属性的接收数组能力
  gl.enableVertexAttribArray(a_Position);

  // 将 a_Position 变量获取数据的缓冲区指向当前绑定的buffer
  gl.vertexAttribPointer(
      a_Position,
      2,
      gl.FLOAT,
      false,
      0,
      0
  );

  clear(gl);
}
