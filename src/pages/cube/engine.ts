import CubeVertexShaderSource from './cube.vert';
import CubeFragmentShaderSource from './cube.frag';
import { setupCanvas } from 'utils';
import { genProgramWithShaderSource, clear } from 'utils/webgl-helper';
import { getMatrixByFov } from 'utils/webl-matrix';

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;

export type ColorArray = [number, number, number, number]

export function createCube(width: number, height: number, depth: number) {
  //正方体 8 个顶点的坐标信息
  let zeroX = width / 2;
  let zeroY = height / 2;
  let zeroZ = depth / 2;
  const positions: [number, number, number][] = [
    [-zeroX, -zeroY, zeroZ],  //V0
    [zeroX, -zeroY, zeroZ],  //V1
    [zeroX, zeroY, zeroZ],   //V2
    [-zeroX, zeroY, zeroZ],  //V3
    [-zeroX, -zeroY, -zeroZ],//V4
    [-zeroX, zeroY, -zeroZ], //V5
    [zeroX, zeroY, -zeroZ],  //V6
    [zeroX, -zeroY, -zeroZ]  //V7
  ]

  // 六个面索引
  const CUBE_FACE_INDICES: [number, number, number, number][] = [
    [0, 1, 2, 3], //前面
    [4, 5, 6, 7], //后面
    [0, 3, 5, 4], //左面
    [1, 7, 6, 2], //右面
    [3, 2, 6, 5], //上面
    [0, 4, 7, 1] // 下面
  ];

  // 六个面颜色
  const CUBE_COLORS: ColorArray[] = [
    [1, 82 / 255, 167 / 255, 1], // 前
    [91 / 255, 201 / 255, 1, 1], // 后
    [1, 222 / 255, 68 / 255, 1], // 左
    [95 / 255, 1, 227 / 255, 1], // 右
    [167 / 255, 77 / 255, 1, 1], // 上
    [1, 106 / 255, 88 / 255, 1]  // 下
  ]

  let vertices: number[] = [];
  let indices: number[] = [];

  for(let f = 0; f < 6; f++) {
    // 处理6个面
    // 总顶点数
    const currFaceIndices = CUBE_FACE_INDICES[f];
    // 某一面颜色
    const color: ColorArray = CUBE_COLORS[f];
    for(let v = 0; v < 4; v++) {
      // 处理4个顶点
      // 3个浮点数表示一个顶点
      // 从裁剪坐标系转换到NDC坐标系
      let someVertices = positions[currFaceIndices[v]];
      vertices = vertices.concat(someVertices, color);
    }
    // 画矩形需要4个顶点
    let offset = 4 * f;
    indices.push(offset + 0, offset + 1, offset + 2);
    indices.push(offset + 0, offset + 2, offset + 3);
  }

  return {
    indices: new Uint8Array(indices),
    vertices: new Float32Array(vertices)
  }
}

export function render() {
  const { indices, vertices } = createCube(1, 1, 1);

  // 啥都不说，直接复制数据到缓存区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
}

export function start() {
  canvas = document.querySelector('canvas');
  const { width, height } = setupCanvas(canvas);
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // gl.enable(gl.CULL_FACE);
  // gl.cullFace(gl.FRONT);

  const program = genProgramWithShaderSource({
    gl,
    vertexShaderSource: CubeVertexShaderSource,
    fragmentShaderSource: CubeFragmentShaderSource
  })

  gl.useProgram(program);

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

  const perspectiveMatrix = getMatrixByFov(135, width / height, 1, 100);
  const u_Matrix = gl.getUniformLocation(program, 'u_Matrix');
  gl.uniformMatrix4fv(u_Matrix, false, perspectiveMatrix);

  clear(gl);
}
