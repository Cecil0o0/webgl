precision mediump float;
uniform vec4 u_Color;

void main() {
  // webgl只能接受分量为[0,1]的vec4向量
  gl_FragColor = u_Color / vec4(255.0, 255.0, 255.0, 1);
}
