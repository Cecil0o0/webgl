precision mediump float;
// 颜色值
varying vec4 v_Color;
// 光源强度
uniform float u_LightFactor;
// 光源颜色
uniform vec3 u_LightColor;

void main() {
  vec3 u_AmbientColor = u_LightColor * u_LightFactor;

  gl_FragColor = (vec4(u_AmbientColor, 1) / vec4(255, 255, 255, 1)) * (v_Color / vec4(255, 255, 255, 1));
}
