precision mediump float;
uniform vec4 u_Color;

void main() {
  vec4 color = u_Color / vec4(255,255,255, 1);
  gl_FragColor = color;
}
