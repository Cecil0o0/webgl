// 设置浮点数精度为中等精度
precision mediump float;
// 接收 JavaScript 传过来的颜色值(RGBA)
uniform vec4 u_Color;
void main() {
  // 讲普通颜色表示转化为 WebGL 需要的表示方式，即将【0-255】转化到【0, 1】之间
  vec4 color = u_Color / vec4(255.0,255.0,255.0, 1.0);
  // 设置像素颜色为红色
  gl_FragColor = color;
}
