// 设置浮点数精度为中等
precision mediump float;
// 接收顶点x,y坐标
attribute vec2 a_Position;
// 接收Canvas宽高尺寸
attribute vec2 a_Screen_Size;
// 接收v_Color
attribute vec4 a_Color;
// 传递给片元着色器
varying vec4 v_Color;

void main() {
  // 将canvas坐标转换为NDC坐标
  vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
  position = position * vec2(1.0 , -1.0);
  gl_Position = vec4(position, 0, 1);
  // 传递的方式挺别扭的=。=
  v_Color = a_Color;
}
