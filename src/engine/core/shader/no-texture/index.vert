precision mediump float;
// 位置属性
attribute vec3 a_Position;
// 颜色属性
attribute vec4 a_Color;
// 顶点法向量
attribute vec3 a_Normal;
// 传递给片元着色器的颜色
varying vec4 v_Color;
// 传递给片元着色器的法向量
varying vec3 v_Normal;
// 传递给片元着色器的顶点位置
varying vec3 v_Position;
// MVP矩阵
uniform mat4 u_Matrix;
// 模型矩阵
uniform mat4 u_NormalMatrix;

void main() {
  gl_Position = u_Matrix * vec4(a_Position, 1.0);

  v_Color = a_Color;

  v_Normal = mat3(u_NormalMatrix) * a_Normal;

  v_Position = mat3(u_NormalMatrix) * a_Position;
}
