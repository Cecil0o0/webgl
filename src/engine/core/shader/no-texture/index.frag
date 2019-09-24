precision mediump float;
// 颜色值
varying vec4 v_Color;
// 法向量
varying vec3 v_Normal;
// 顶点位置
varying vec3 v_Position;
// 环境光源因子，表示强度
uniform float u_AmbientLightFactor;
// 环境光源颜色
uniform vec3 u_AmbientLightColor;
// 点光源位置
uniform vec3 u_LightPosition;
// 点光源颜色
uniform vec3 u_PointLightColor;

void main() {
  // 环境光分量
  vec3 ambientColor = u_AmbientLightColor * u_AmbientLightFactor;

  if (v_Normal == vec3(0,0,0)) {

    gl_FragColor = vec4(ambientColor, 1.0) * v_Color / vec4(255, 255, 255, 1);
  } else {
    // 光源照射方向向量，模拟平行光线通常是遥远的光源比如太阳光
    vec3 lightDirection = u_LightPosition - v_Position;

    // 漫反射因子
    float diffuseFactor = dot(normalize(lightDirection), normalize(v_Normal));

    // 如果是负数，则说明光线与法向量夹角大于 90 度，此时照不到平面上，所以没有光照即黑色
    diffuseFactor = max(diffuseFactor, 0.0);

    // 漫反射光分量
    vec3 diffuseAmbientLightColor = u_AmbientLightColor * diffuseFactor;

    // 物体在光照下的颜色 = 环境光因子 * 漫反射光照 * 物体颜色
    gl_FragColor = vec4((ambientColor +  diffuseAmbientLightColor), 1.0) * (v_Color / vec4(255, 255, 255, 1));
  }
}
