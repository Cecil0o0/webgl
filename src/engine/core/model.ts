import { PositionsArray, IndicesArray } from 'types';
import { deg2radian } from 'engine';
import Object3D from './object3d';
import SphereNoTextureVertexShaderSrc from './shader/no-texture/index.vert';
import SphereNoTextureFragmentShaderSrc from './shader/no-texture/index.frag';
import Geometry from './geometry/basic';
import { mat4 } from 'gl-matrix';

// 模型顶点数据
class ModelBufferInfo {
  attributes?: {
    a_Position: {
      buffer: PositionsArray;
      type?: number;
      normalize?: false;
      floatNumsPerElement?: 3;
      stride?: 0;
      offset?: 0;
    };
    a_Color?: {
      buffer: Float32Array;
      type?: number;
      normalize?: false;
      floatNumsPerElement?: 4;
      stride?: 0;
      offset?: 0;
    };
    a_Normal?: {
      buffer: Float32Array;
      type?: number;
      normalize?: false;
      floatNumsPerElement?: 3;
      stride?: 0;
      offset?: 0;
    };
    [key: string]: any;
  };
  indices?: IndicesArray;
}

// 模型矩阵转换数据
class Uniforms {
  // MVP（模型视图投影）矩阵
  u_MVPMatrix?: mat4;
  // 模型矩阵
  u_ModelMatrix?: mat4;
  // 法向量矩阵
  u_NormalMatrix?: mat4;
}

export default class Model extends Object3D {
  program: WebGLProgram;
  primitive: string = 'TRIANGLES';
  renderType: string = 'drawElements';
  // 位置、颜色、纹理、法向量等缓冲数据
  bufferInfo: ModelBufferInfo;
  // 矩阵数据
  uniforms: Uniforms = {
    u_MVPMatrix: mat4.create(),
    u_ModelMatrix: mat4.create(),
    u_NormalMatrix: mat4.create()
  };
  // shader源码
  shaderSource: {
    fragment: string;
    vertex: string;
  } = {
    fragment: SphereNoTextureFragmentShaderSrc,
    vertex: SphereNoTextureVertexShaderSrc
  };

  constructor(
    geometry: Geometry,
    colors: number[],
    options?: {
      shaderSource: {
        fragment: string;
        vertex: string;
      };
    }
  ) {
    super();
    this.bufferInfo = {
      attributes: {
        a_Position: {
          buffer: geometry.positions,
          floatNumsPerElement: 3
        },
        a_Color: {
          buffer: Float32Array.from(colors)
        },
        a_Normal: {
          buffer:
            geometry.normals ||
            Float32Array.from({ length: geometry.positions.length }, () => 1),
          floatNumsPerElement: 3
        }
      },
      indices: geometry.indices
    };
    if (options && options.shaderSource) {
      this.shaderSource = options.shaderSource;
    }
  }

  setBufferInfo(bufferInfo: ModelBufferInfo) {
    this.bufferInfo = bufferInfo;
  }

  // 用于对模型的重新渲染，即顶点坐标和矩阵变换
  preRender(viewMatrix: mat4, projectionMatrix: mat4) {
    const modelMatrix = mat4.create();
    if (this.translation) {
      mat4.translate(modelMatrix, modelMatrix, this.translation);
    }
    if (this.rotation) {
      this.rotation;
      mat4.rotateX(modelMatrix, modelMatrix, deg2radian(this.rotation[0]));
      mat4.rotateY(modelMatrix, modelMatrix, deg2radian(this.rotation[1]));
      mat4.rotateZ(modelMatrix, modelMatrix, deg2radian(this.rotation[2]));
    }
    if (this.scalation) {
      mat4.scale(modelMatrix, modelMatrix, this.scalation);
    }
    // 模型矩阵
    this.uniforms.u_ModelMatrix = modelMatrix;
    // 法向量矩阵
    this.uniforms.u_NormalMatrix = modelMatrix;

    // 视图矩阵
    mat4.multiply(
      this.uniforms.u_MVPMatrix,
      viewMatrix,
      this.uniforms.u_ModelMatrix
    );
    // 投影矩阵
    mat4.multiply(
      this.uniforms.u_MVPMatrix,
      projectionMatrix,
      this.uniforms.u_MVPMatrix
    );
  }
}
