precision mediump float;
// 三维坐标
attribute vec3 a_Position;
// 透视投影矩阵
uniform mat4 u_Matrix;
// 接收颜色
attribute vec4 a_Color;
// 传递颜色给片元着色器
varying vec4 v_Color;

void main() {
  gl_Position = u_Matrix * vec4(a_Position, 1);
  gl_PointSize = 4.0;

  v_Color = a_Color;
}
