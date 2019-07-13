precision mediump float;
varying vec4 v_Color;

void main() {
  gl_FragColor = v_Color / vec4(255.0, 255.0, 255.0, 1.0);
}
