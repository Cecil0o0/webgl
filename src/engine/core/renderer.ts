import {getDPR} from 'engine/other';
import Scene from './scene';
import OrthoCamera from './ortho-camera';
import PerspectiveCamera from './perspective-camera';
import {
  getGlContext,
  genProgramWithShaderSource,
  clear,
} from 'engine/webgl-helper';
import {matrix, Model, Object3D} from 'engine';

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
  render(scene: Scene, camera?: OrthoCamera | PerspectiveCamera) {
    const gl = this.gl;
    clear(gl);
    scene.objList.forEach(object => {
      if (!object.program) generateProgram(gl, object);
      gl.useProgram(object.program);
      uploadAttribsData(gl, object);
      uploadUniformsData(gl, object);

      if (object.renderType === 'drawElements') {
        gl.drawElements(
            (gl as any)[object.primitive],
            object.model.bufferInfo.indices.length,
            gl.UNSIGNED_BYTE,
            0
        );
      }

      console.log(object);
    });
  }
}

function generateProgram(gl: WebGLRenderingContext, object: Object3D) {
  object.program = genProgramWithShaderSource({
    gl,
    fragmentShaderSource: object.model.shaderSource.fragment,
    vertexShaderSource: object.model.shaderSource.vertex,
  });
}

function uploadAttribsData(
    gl: WebGLRenderingContext,
    {program, model}: { program: WebGLProgram; model: Model }
) {
  // 为保证每次都渲染最新数据，所以每一帧都需要更新缓存区，需要做一下benchmark。
  // 上传200左右的点耗时60微秒，可能存在瓶颈，而且不稳定，有时候会飙到3毫秒之多
  const attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  console.log('上传并绑定所有激活的attribute变量的数据，比如位置、颜色');
  for (let i = 0; i < attribCount; i++) {
    console.time('upload GPU Data' + i);
    const attribInfo = gl.getActiveAttrib(program, i);
    console.log("TCL: attribInfo", attribInfo)
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
    {program, model}: { program: WebGLProgram; model: Model }
) {
  console.log('上传uniform变量的数据，比如投影变换矩阵和视图矩阵');
  // 计算平移、旋转、缩放、视图矩阵、投影矩阵
  // 需要1ms，很可能是性能瓶颈
  console.time('pre-render开销')
  model.preRender(matrix.identity(), model.uniforms.u_Matrix);
  console.timeEnd('pre-render开销')
  gl.uniformMatrix4fv(
    gl.getUniformLocation(program, 'u_Matrix'),
    false,
    model.finalMatrix
  );
}

export {Renderer};
