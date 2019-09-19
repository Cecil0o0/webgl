import { PositionsArray, IndicesArray } from 'types';
import { deg2radian } from 'engine';
import Object3D from './object3d';
import SphereNoTextureVertexShaderSrc from './shader/no-texture/index.vert';
import SphereNoTextureFragmentShaderSrc from './shader/no-texture/index.frag';
import Geometry from './geometry/basic';
import { mat4, vec3 } from 'gl-matrix';

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
  // 全局光照
  u_LightColor?: any;
}

export default class Model extends Object3D {
  // 偏移
  translation = vec3.create();
  // 旋转角度
  // 角度制
  rotation = vec3.create();
  // 缩放
  scalation = vec3.fromValues(1, 1, 1);
  // 位置、颜色、纹理等缓冲数据
  bufferInfo: ModelBufferInfo;
  // 矩阵数据
  uniforms: Uniforms = {
    u_MVPMatrix: mat4.create()
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
    },
    Object3DOptions?: {
      primitive?: string;
      renderType?: string;
      program?: WebGLProgram;
    }
  ) {
    super(Object3DOptions);
    this.bufferInfo = {
      attributes: {
        a_Position: {
          buffer: geometry.positions,
          floatNumsPerElement: 3
        },
        a_Color: {
          buffer: Float32Array.from(colors)
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

  // 平移属性变换方法
  translateV(v3: vec3) {
    this.translation.set(v3, 0);
  }

  translate(x?: number, y?: number, z?: number) {
    this.translation.set([x, y, z], 0);
  }

  translateX(x = 0) {
    this.translation.set([x], 0);
  }

  translateY(y = 0) {
    this.translation.set([y], 1);
  }

  translateZ(z = 0) {
    this.translation.set([z], 2);
  }

  // 旋转属性变换方法
  rotateV(v3: vec3) {
    this.rotation.set(v3, 0);
  }

  rotate(x?: number, y?: number, z?: number) {
    this.rotation.set([x, y, z], 0);
  }

  rotateX(x = 0) {
    this.rotation.set([x], 0);
  }

  rotateY(y = 0) {
    this.rotation.set([y], 1);
  }

  rotateZ(z = 0) {
    this.rotation.set([z], 2);
  }

  // 缩放属性变换方法
  scaleV(v3: vec3) {
    this.scalation.set(v3, 0);
  }

  scale(x?: number, y?: number, z?: number) {
    this.scalation.set([x, y, z], 0);
  }

  scaleX(x = 0) {
    this.scalation.set([x], 0);
  }

  scaleY(y = 0) {
    this.scalation.set([y], 1);
  }

  scaleZ(z = 0) {
    this.scalation.set([z], 2);
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
