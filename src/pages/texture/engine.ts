import TextureFragmentShaderSource from './texture.frag';
import TextureVertexShaderSource from './texture.vert';
import { setupCanvas } from 'utils';
import { genProgramWithShaderSource, clear } from 'utils/webgl-helper';
import AwesomeImage from '@/images/awesome.jpg';

let gl: WebGLRenderingContext;
let canvas: HTMLCanvasElement;
let u_Texture: WebGLUniformLocation;
let img: HTMLImageElement = new Image();

function loadTexture(img: HTMLImageElement) {

  // 激活 0 号纹理单元（本义是unit但解释为通道有助于理解）gl.TEXTURE0
  gl.activeTexture(gl.TEXTURE0);

  // 创建一个纹理对象
  const texture = gl.createTexture();

  // 将纹理对象绑定到 当前纹理绑定点 上，即gl.TEXTURE_2D。这一点和bindBuffer非常非常相似
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 为片元着色器传递图片数据
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

  // 设置图片缩放的算法gl.LINEAR
  // 其实这个方法名暴露了其实是给texture的某个属性传递一个float类型的参数
  gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // 为片元着色器传递 0 号纹理通道
  gl.uniform1i(u_Texture, 0);
}

const vertices = [
  30, 30, 0, 0,    //V0
  30, 200, 0, 1,   //V1
  200, 200, 1, 1,  //V2
  30, 30, 0, 0,    //V0
  200, 200, 1, 1,  //V2
  200, 30, 1, 0,    //V3
]

export function render() {
  img.src = AwesomeImage;
  img.onload = () => {
    loadTexture(img);
    clear(gl);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 4);
  };
}

export function start() {
  canvas = document.querySelector('canvas');
  const { width, height } = setupCanvas(canvas);
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  const program = genProgramWithShaderSource({
    gl,
    fragmentShaderSource: TextureFragmentShaderSource,
    vertexShaderSource: TextureVertexShaderSource
  })

  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  u_Texture = gl.getUniformLocation(program, 'u_Texture');

  const a_Position = gl.getAttribLocation(program, 'a_Position');
  gl.enableVertexAttribArray(a_Position);
  gl.vertexAttribPointer(
    a_Position,
    2,
    gl.FLOAT,
    false,
    16,
    0
  )

  const a_Uv = gl.getAttribLocation(program, 'a_Uv');
  gl.enableVertexAttribArray(a_Uv);
  gl.vertexAttribPointer(
    a_Uv,
    2,
    gl.FLOAT,
    false,
    16,
    8
  )

  const a_Screen_Size = gl.getAttribLocation(program, 'a_Screen_Size');
  gl.vertexAttrib2f(a_Screen_Size, width, height);

  clear(gl);
}
