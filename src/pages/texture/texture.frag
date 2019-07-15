precision mediump float;
varying vec2 v_Uv;
// 接收纹理
uniform sampler2D u_Texture;

void main() {
  // 提取纹理对应uv坐标上的颜色，赋值给当前片元（像素）
  gl_FragColor = texture2D(u_Texture, vec2(v_Uv.x, v_Uv.y));
}
