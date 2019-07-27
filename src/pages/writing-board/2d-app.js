import squareVertexShaderSource from './point.vert';
import redFragmentShaderSource from './point.frag';
import {genShader, genProgram, clear} from 'engine/webgl-helper';
import {randomColor, getPlainArr, getDPR, setupCanvas} from 'engine';

let canvas; let gl; let a_Position; let a_Screen_Size; let u_Color;

// 存储点的数组
let points = [];
// 是否摁下鼠标或者trackpad
let holdOn = false;
// 缓存某一整条路径，以一条线为最小粒度，用于撤销
let cachedOneLine = [];
// 缓存重做的路径
let redoLines = [];

export const downHandler = () => (holdOn = true);
export const moveHandler = (e) => {
  e.preventDefault();
  if (!holdOn) return;
  let x; let y;
  if (e.type === 'touchmove') {
    x = e.changedTouches[0].pageX;
    y = e.changedTouches[0].pageY;
  } else if (e.type === 'mousemove') {
    x = e.pageX;
    y = e.pageY;
  }
  const color = randomColor();
  cachedOneLine.push({x, y, color});
  const arr = getPlainArr(points).concat(cachedOneLine);
  drawPoints(arr);
};
export const upHandler = () => {
  holdOn = false;
  if (cachedOneLine.length) {
    points.push(cachedOneLine);
    cachedOneLine = [];
  }
};
export const clearHandler = () => {
  clear(gl);
  redoLines = [getPlainArr(points)];
  points = [];
  cachedOneLine = [];
};
export const undoHandler = () => {
  if (!points.length) return;
  redoLines.push(points.pop());
  drawPoints(getPlainArr(points));
};
export const redoHandler = () => {
  if (!redoLines.length) return;
  points.push(redoLines.pop());
  drawPoints(getPlainArr(points));
};

export function drawPoints(points) {
  clear(gl);
  points.forEach((point) => {
    const rgb = point.color;
    // 为顶点着色器 a_Position 变量传递顶点坐标
    gl.vertexAttrib2f(a_Position, point.x, point.y);
    // 为片元着色器 u_Color 传递随机色值
    gl.uniform4f(u_Color, rgb.r, rgb.g, rgb.b, rgb.a);
    // 绘制点
    // gl.POINTS 即点图元（Rendering Primitives）
    gl.drawArrays(gl.POINTS, 0, 1);
  });
}

export function start() {
  canvas = document.querySelector('#canvas');
  const {width, height} = setupCanvas(canvas);
  const DPR = getDPR();

  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // Create a vertex shader
  const vertexShader = genShader(gl, gl.VERTEX_SHADER, squareVertexShaderSource);

  // Create a fragment shader
  const redFragmentShader = genShader(gl, gl.FRAGMENT_SHADER, redFragmentShaderSource);

  // Create a program
  const program = genProgram(gl, vertexShader, redFragmentShader);

  // Link program
  gl.linkProgram(program);

  // Use the program
  gl.useProgram(program);

  // 获取顶点着色器中的变量 a_Position 的引用
  a_Position = gl.getAttribLocation(program, 'a_Position');
  // 获取定点着色器中的变量 a_Screen_Size 的引用
  a_Screen_Size = gl.getAttribLocation(program, 'a_Screen_Size');
  // 获取片元着色器中的变量 u_Color 的引用
  u_Color = gl.getUniformLocation(program, 'u_Color');
  // 获取 u_dpr 的引用
  gl.uniform1f(gl.getUniformLocation(program, 'u_dpr'), DPR);
  // 为顶点着色器 a_Screen_Size 传递 cavnas的宽高
  gl.vertexAttrib2f(a_Screen_Size, width, height);

  clear(gl);
}
