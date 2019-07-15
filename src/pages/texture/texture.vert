precision mediump float;
attribute vec2 a_Position;
attribute vec2 a_Screen_Size;
// UV坐标指代纹理坐标系中的坐标
attribute vec2 a_Uv;
varying vec2 v_Uv;

void main() {
  vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
  position = position * vec2(1.0, - 1.0);
  gl_Position = vec4(position, 0, 1.0);

  v_Uv = a_Uv;
}
