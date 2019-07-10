import {genShader, genProgram, clear} from 'webgl-helper';
import {setupCanvas, randomColor, isValid} from 'utils';
import LineFragmentShaderSource from './line.frag';
import LineVertexShaderSource from './line.vert';
import {WEBGL_LINE_TYPES_ENUM} from './const';

let canvas: HTMLCanvasElement; let gl: WebGLRenderingContext; let u_Color: WebGLUniformLocation;
let positions: number[] = [];

export function renderLine(type: string = Object.keys(WEBGL_LINE_TYPES_ENUM)[0]) {
  copyBufferData(positions);

  // 设置颜色
  const {r, g, b, a} = randomColor();
  gl.uniform4f(u_Color, r, g, b, a);

  clear(gl);
  gl.drawArrays(gl[type], 0, positions.length / 2);
}

export function reset() {
  positions = [];
}

export function pushVertices(values: number[]) {
  positions.push(...values)
}

export function copyBufferData(jsArray: number[]) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(jsArray), gl.DYNAMIC_DRAW);
}

export function start() {
  canvas = document.querySelector('canvas');

  // ! setUpCanvas 和 getContext绝对绝对不能搞反了！（花了一天时间check代码，check diff）
  const {width, height} = setupCanvas(canvas);
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // create vertex shader
  const lineVertextShader = genShader(gl, gl.VERTEX_SHADER, LineVertexShaderSource);
  // create fragment shader
  const lineFragmentShader = genShader(gl, gl.FRAGMENT_SHADER, LineFragmentShaderSource);
  // create a program
  const LineProgram = genProgram(gl, lineVertextShader, lineFragmentShader);
  // link the program
  gl.linkProgram(LineProgram);
  // use the program
  gl.useProgram(LineProgram);

  // create buffer
  const buffer = gl.createBuffer();
  // bind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // get the a_Position pointer
  const a_Position = gl.getAttribLocation(LineProgram, 'a_Position');
  // get the a_Screen_Size pointer
  const a_Screen_Size = gl.getAttribLocation(LineProgram, 'a_Screen_Size');
  // console.log(canvas.width, canvas.height)
  gl.vertexAttrib2f(a_Screen_Size, width, height);
  // get the u_Color pointer
  u_Color = gl.getUniformLocation(LineProgram, 'u_Color');

  // enable a_Position so that it's can read the buffer
  gl.enableVertexAttribArray(a_Position);

  // 让a_Position按照一定规则从buffer读取数据
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  clear(gl);
}
