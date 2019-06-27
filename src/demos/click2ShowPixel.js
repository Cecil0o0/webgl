import squareVertexShaderSource from 'shader/vertex/1.vert';
import redFragmentShaderSource from 'shader/fragment/1.frag';
import { genShader, genProgram } from 'webgl-helper';
import { randomColor } from 'utils';

const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

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

function clear() {
  // Set clearColor
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}

clear();

// 获取顶点着色器中的变量 a_Position 的引用
const a_Position = gl.getAttribLocation(program, 'a_Position');
// 获取定点着色器中的变量 a_Screen_Size 的引用
const a_Screen_Size = gl.getAttribLocation(program, 'a_Screen_Size');
// 获取片元着色器中的变量 u_Color 的引用
const u_Color = gl.getUniformLocation(program, 'u_Color');
// 为顶点着色器 a_Screen_Size 传递 cavnas的宽高
gl.vertexAttrib2f(a_Screen_Size, canvas.width, canvas.height);
// 存储点的数组
let points = [];
// 是否摁下鼠标或者trackpad
let holdOn = false

canvas.addEventListener('mousedown', () => holdOn = true)
canvas.addEventListener('mouseup', () => holdOn = false)

canvas.addEventListener('mousemove', e => {
  if (!holdOn) return
  const { pageX: x, pageY: y } = e;
  const color = randomColor();
  points.push( { x, y, color });
  drawPoints();
})

function drawPoints() {
  clear();
  points.forEach(point => {
    const rgb = point.color;
    // 为顶点着色器 a_Position 变量传递顶点坐标
    gl.vertexAttrib2f(a_Position, point.x, point.y);
    // 为片元着色器 u_Color 传递随机色值
    gl.uniform4f(u_Color, rgb.r, rgb.g, rgb.b, rgb.a);
    // 绘制点
    // gl.POINTS 即点图元（Rendering Primitives）
    gl.drawArrays(gl.POINTS, 0, 1);
  })
}
let a = 0;
canvas.addEventListener('click', e => {
  a++;
  let timer = setTimeout(() => a = 0, 300);
  if (a === 2) {
    clear();
    points = []
    clearTimeout(timer);
  }
})

