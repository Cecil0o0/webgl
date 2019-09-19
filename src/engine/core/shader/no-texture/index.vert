precision mediump float;
// 位置属性
attribute vec3 a_Position;
// 颜色属性
attribute vec4 a_Color;
// 传递给片元着色器颜色的属性
varying vec4 v_Color;
// 矩阵
uniform mat4 u_Matrix;
// 光源强度
attribute float a_light_intensity;
// 光源颜色
uniform mat4 u_light_color;

void main() {
  gl_Position = u_Matrix * vec4(a_Position, 1.0);

  v_Color = a_Color;
}
