import rectangleVertexShaderSource from './rectangle.vert';
import rectangleFragmentShaderSource from './rectangle.frag';
import { genProgramWithShaderSource, clear } from 'utils/webgl-helper';
import { transformStartXY, setupCanvas } from 'utils';
import { raf } from 'utils/animation';

let gl: WebGLRenderingContext;
let canvas: HTMLCanvasElement;
let a_Position: number;
let a_Color: number;

// vertices
const vertices = [
  20, 100, 255, 0, 0, 1,  // v0
  20, 200, 255, 0, 0, 1,  // v1
  120, 100, 255, 0, 0, 1, // v2
  120, 200, 255, 0, 255, 1  // v3
]

// indices
const indices = [
  0, 1, 2, // 第一个三角型的顶点
  1, 2, 3  // 第二个三角形的顶点
]

export function render() {
  // renderUseTriangles()
  // renderUseTriangleFan()
  renderCircle()
}

export function renderUseTriangles() {
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
}

// isolate render block
export function renderUseTriangleFan() {
  const positions = [
    50, 50, 255, 0, 255, 1,
    100, 0, 255, 0, 0, 1,
    100, 100, 255, 0, 0, 1,
    0, 100, 255, 0, 0, 1,
    0, 0, 255, 0, 0, 1,
    100, 0, 255, 0, 0, 1
  ]
  transformStartXY(200, 100, positions);
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  reDefineHowtoReadData();
  gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 6);
}

function renderCircle(n = 40) {
  const radius = 100;
  const x = 0;
  const y = 0;
  const vertices = [
    x, y, 0, 243, 255, 1,
  ]
  for(let i = 0; i <= n; i ++) {
    let radian = i * 2 * Math.PI / n;
    vertices.push(x + Math.sin(radian) * radius, y - Math.cos(radian) * radius, 126, 20, 255, 1);
  }
  transformStartXY(window.innerWidth / 2, window.innerHeight / 2, vertices);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  reDefineHowtoReadData();
  gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 6);
}

let triangleNum = 3;
let rafManange = raf(() => {
  if (triangleNum > 50) {
    rafManange.stop()
    // 释放引用，让GC回收内存
    rafManange = null;
  };
  clear(gl)
  renderCircle(triangleNum++)
}, 2);
setTimeout(rafManange.start, 2e3);

export function start() {
  canvas = document.querySelector('canvas');
  const { width, height } = setupCanvas(canvas);
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  const rectProgram = genProgramWithShaderSource({ gl, vertexShaderSource: rectangleVertexShaderSource, fragmentShaderSource: rectangleFragmentShaderSource });

  gl.linkProgram(rectProgram);

  gl.useProgram(rectProgram);

  // 建立顶点buffer
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // 传递数据给顶点buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // 建立索引buffer
  const indicesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

  // 给索引buffer传递数据
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  const a_Screen_Size = gl.getAttribLocation(rectProgram, 'a_Screen_Size');
  gl.vertexAttrib2f(a_Screen_Size, width, height);

  a_Position = gl.getAttribLocation(rectProgram, 'a_Position');
  gl.enableVertexAttribArray(a_Position);

  a_Color = gl.getAttribLocation(rectProgram, 'a_Color');
  gl.enableVertexAttribArray(a_Color);
  reDefineHowtoReadData()

  clear(gl)
}

// 因为使用bindBuffer方法切换buffer之后需要重新定义，vertexAttrib读取buffer的方式
export function reDefineHowtoReadData() {
  gl.vertexAttribPointer(
    a_Position,
    2,
    gl.FLOAT,
    false,
    24,
    0
  )
  gl.vertexAttribPointer(
    a_Color,
    4,
    gl.FLOAT,
    false,
    24,
    8
  )
}
