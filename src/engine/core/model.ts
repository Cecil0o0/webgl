import * as matrix from 'engine/webgl-matrix';
import {Matrix, PositionsArray, IndicesArray} from 'types';
import {Vector3, deg2radian} from 'engine';
import SphereNoTextureVertexShaderSrc from './shader/no-texture/index.vert';
import SphereNoTextureFragmentShaderSrc from './shader/no-texture/index.frag';

// 模型顶点数据
class ModelBufferInfo {
  attributes?: {
    a_Position: {
      buffer: PositionsArray;
      type?: number;
      normalize?: false;
      floatNumsPerElement?: 3;
      stride?: 0;
      offset?: 0
    };
    a_Color?: {
      buffer: Float32Array;
      type?: number;
      normalize?: false;
      floatNumsPerElement?: 4;
      stride?: 0;
      offset?: 0
    };
    [key: string]: any
  };
  indices?: IndicesArray;
}

// 模型矩阵转换数据
class Uniforms {
  // MVP（模型视图投影）矩阵
  u_Matrix?: Matrix;
  // 模型矩阵
  u_ModelMatrix?: Matrix;
  // 法向量矩阵
  u_NormalMatrix?: Matrix;
  // 全局光照
  u_LightColor?: any;
}

export default class Model {
  // 最终传递给顶点着色器的矩阵
  finalMatrix: Matrix = matrix.identity();
  // 偏移
  translation = new Vector3();
  // 旋转角度
  // 角度制
  rotation = new Vector3();
  // 缩放
  scalation = new Vector3(1, 1, 1);
  // 位置、颜色、纹理等缓冲数据
  bufferInfo: ModelBufferInfo;
  // 矩阵数据
  uniforms: Uniforms;
  // shader源码
  shaderSource: {
    fragment: string;
    vertex: string;
  } = {
    fragment: SphereNoTextureFragmentShaderSrc,
    vertex: SphereNoTextureVertexShaderSrc,
  };

  constructor(
    bufferInfo: ModelBufferInfo,
    uniforms?: Uniforms,
    options?: {
      shaderSource: {
        fragment: string;
        vertex: string;
      };
    }
  ) {
    this.uniforms = uniforms;
    this.bufferInfo = bufferInfo;
    if (options && options.shaderSource) {
      this.shaderSource = options.shaderSource;
    }
  }

  setBufferInfo(bufferInfo: ModelBufferInfo) {
    this.bufferInfo = bufferInfo;
  }

  // 平移属性变换方法
  translateV(v3: Vector3) {
    this.translateX(v3.x);
    this.translateY(v3.y);
    this.translateZ(v3.z);
  }

  translate(x = 0, y = 0, z = 0) {
    // 不套用translateV原因有二
    // 调用栈少一层函数
    // 不用new对象
    this.translateX(x);
    this.translateY(y);
    this.translateZ(z);
  }

  translateX(x = 0) {
    this.translation.setX(x);
  }

  translateY(y = 0) {
    this.translation.setY(y);
  }

  translateZ(z = 0) {
    this.translation.setZ(z);
  }

  // 旋转属性变换方法
  rotateV(v3: Vector3) {
    this.rotateX(v3.x);
    this.rotateY(v3.y);
    this.rotateZ(v3.z);
  }

  rotate(x = 0, y = 0, z = 0) {
    // 理由同上
    this.rotateX(x);
    this.rotateY(y);
    this.rotateZ(z);
  }

  rotateX(x = 0) {
    this.rotation.setX(x);
  }

  rotateY(y = 0) {
    this.rotation.setY(y);
  }

  rotateZ(z = 0) {
    this.rotation.setZ(z);
  }

  // 缩放属性变换方法
  scaleV(v3: Vector3) {
    this.scaleX(v3.x);
    this.scaleY(v3.y);
    this.scaleZ(v3.z);
  }

  scale(x = 0, y = 0, z = 0) {
    // 理由同上
    this.scaleX(x);
    this.scaleY(y);
    this.scaleZ(z);
  }

  scaleX(x = 0) {
    this.scalation.setX(x);
  }

  scaleY(y = 0) {
    this.scalation.setY(y);
  }

  scaleZ(z = 0) {
    this.scalation.setZ(z);
  }

  // 用于对模型的重新渲染，即顶点坐标和矩阵变换
  preRender(viewMatrix: Matrix, projectionMatrix: Matrix) {
    const modelMatrix = matrix.identity();
    if (this.translation) {
      matrix.translate(
          modelMatrix,
          this.translation.x,
          this.translation.y,
          this.translation.z,
          modelMatrix
      );
    }
    if (this.rotation) {
      matrix.rotateX(modelMatrix, deg2radian(this.rotation.x), modelMatrix);
      matrix.rotateY(modelMatrix, deg2radian(this.rotation.y), modelMatrix);
      matrix.rotateZ(modelMatrix, deg2radian(this.rotation.z), modelMatrix);
    }
    if (this.scalation) {
      matrix.scale(
          modelMatrix,
          this.scalation.x,
          this.scalation.y,
          this.scalation.z,
          modelMatrix
      );
    }

    // 重新计算矩阵
    matrix.multiply(viewMatrix, modelMatrix, this.finalMatrix);
    matrix.multiply(projectionMatrix, this.finalMatrix, this.finalMatrix);
  }
}
