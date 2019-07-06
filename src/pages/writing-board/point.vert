// 设置浮点数精度为中等精度
precision mediump float;
// 接收点在 canvas 坐标系上的坐标(x,y)
attribute vec2 a_Position;
// 接收 canvas 的宽高尺寸
attribute vec2 a_Screen_Size;

void main() {
  // start 将屏幕坐标系转化为裁剪坐标系
  vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
  position = position * vec2(1.0, -1.0);
  // 声明顶点位置
  gl_Position = vec4(position, 0.0, 1.0);
  // end 将屏幕坐标系转化为裁剪坐标系
  // 声明要绘制的点的大小
  gl_PointSize = 4.0;
}
