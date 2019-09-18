import { getDPR } from 'engine/other';
import Scene from './scene';
import OrthoCamera from './ortho-camera';
import {
  getGlContext,
  genProgramWithShaderSource,
  clear
} from 'engine/webgl-helper';
import { Model } from 'engine';

export default class Renderer {
  domElement: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  constructor() {
    this.domElement = document.createElement('canvas');
  }
  setSize(w: number, h: number) {
    const DPR = getDPR();
    const canvas = this.domElement;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    this.gl = getGlContext(this.domElement);
    this.initGl();
  }
  initGl() {
    const { gl } = this;
    gl.enable(gl.CULL_FACE);
  }
  render(scene: Scene, camera?: OrthoCamera) {
    const gl = this.gl;
    clear(gl);
    scene.objList.forEach(model => {
      if (!model.program) generateProgram(gl, model);
      gl.useProgram(model.program);
      uploadAttribsData(gl, model);
      uploadUniformsData(gl, model, camera);

      if (model.renderType === 'drawElements') {
        gl.drawElements(
          (gl as any)[model.primitive],
          model.bufferInfo.indices.length,
          gl.UNSIGNED_BYTE,
          0
        );
      }
    });
  }
}

function generateProgram(gl: WebGLRenderingContext, model: Model) {
  model.program = genProgramWithShaderSource({
    gl,
    fragmentShaderSource: model.shaderSource.fragment,
    vertexShaderSource: model.shaderSource.vertex
  });
}

function uploadAttribsData(gl: WebGLRenderingContext, model: Model) {
  // 为保证每次都渲染最新数据，所以每一帧都需要更新缓存区，需要做一下benchmark。
  // 上传200左右的点耗时60微秒，可能存在瓶颈，而且不稳定，有时候会飙到3毫秒之多
  const { program } = model;
  const attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < attribCount; i++) {
    console.time('upload GPU Data' + i);
    const attribInfo = gl.getActiveAttrib(program, i);
    const attribName = attribInfo.name;
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    const attribLocation = gl.getAttribLocation(program, attribName);
    gl.enableVertexAttribArray(attribLocation);
    const attribConfig = model.bufferInfo.attributes[attribName];
    gl.bufferData(gl.ARRAY_BUFFER, attribConfig.buffer, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(
      attribLocation,
      attribConfig.floatNumsPerElement || 4,
      attribConfig.type || gl.FLOAT,
      attribConfig.normalize || false,
      attribConfig.stride || 0,
      attribConfig.offset || 0
    );
    console.timeEnd('upload GPU Data' + i);
  }

  // 向GPU上传Elements索引数据
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    model.bufferInfo.indices,
    gl.DYNAMIC_DRAW
  );
}

function uploadUniformsData(
  gl: WebGLRenderingContext,
  model: Model,
  camera: OrthoCamera
) {
  // 计算平移、旋转、缩放、视图矩阵、投影矩阵（即MVP矩阵）
  // 需要1ms，很可能是性能瓶颈
  console.time('pre-render开销');
  model.preRender(camera.viewMatrix, camera.projectionMatrix);
  console.timeEnd('pre-render开销');
  gl.uniformMatrix4fv(
    gl.getUniformLocation(model.program, 'u_Matrix'),
    false,
    model.uniforms.u_MVPMatrix
  );
}

export { Renderer };
