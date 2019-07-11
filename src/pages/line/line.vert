precision mediump float;
attribute vec2 a_Position;
attribute vec2 a_Screen_Size;
attribute float a_Dpr;

void main() {
  // 转换观察坐标系 到 NDC（裁剪）坐标系
  vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
  // 转换中等精度
  position = position * vec2(1.0, -1.0);
  gl_Position = vec4(position, 0, 1.0);
  gl_PointSize = 6.0 * a_Dpr;
}
