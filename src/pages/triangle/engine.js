import {genShader, genProgram, clear} from 'webgl-helper';
import triangleVertexshaderSource from './triangle.vert';
import triangleFragmentShaderSource from './triangle.frag';

let canvas; let gl;


export function boot() {
  canvas = document.querySelector('canvas');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // create a vertex shader
  const vertexShader = genShader(gl, gl.VERTEX_SHADER, triangleVertexshaderSource);

  // create a fragment shader
  const fragmentShader = genShader(gl, gl.FRAGMENT_SHADER, triangleFragmentShaderSource);

  // create a shader program
  const program = genProgram(gl, vertexShader, fragmentShader);

  // link the program
  gl.linkProgram(program);

  // use the program
  gl.useProgram(program);

  clear(gl);
}
