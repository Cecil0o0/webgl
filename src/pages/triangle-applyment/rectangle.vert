precision mediump float;
attribute vec2 a_Position;
attribute vec2 a_Screen_Size;
attribute vec4 a_Color;
varying vec4 v_Color;

void main() {
  vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
  position = position * vec2(1.0, -1.0);
  gl_Position = vec4(position, 0, 1.0);
  v_Color = a_Color;
}
