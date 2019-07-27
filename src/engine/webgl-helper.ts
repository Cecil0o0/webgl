import { VertexAttribPointerConfig, GeometryElementData } from "types";

export function genShader(gl: WebGLRenderingContext, shaderType: number, shaderSourceCode: string) {
  // Create a shader
  const shader = gl.createShader(shaderType);
  // Filling source code for the shader
  gl.shaderSource(shader, shaderSourceCode);
  // Compile shader
  gl.compileShader(shader);

  // Check for any compilation error
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

export function genProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  // Create shader program
  const program = gl.createProgram();
  // Attach vertex shader to program
  gl.attachShader(program, vertexShader);
  // Attach fragment shader to program
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  let result = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (result) {
    console.log('着色器程序创建成功');
    return program;
  }
  let errorlog = gl.getProgramInfoLog(program);
  gl.deleteProgram(program);
  throw errorlog;
}

export function genProgramWithShaderSource({
  gl,
  vertexShaderSource,
  fragmentShaderSource,
}: {
  gl: WebGLRenderingContext;
  vertexShaderSource: string;
  fragmentShaderSource: string;
}) {
  return genProgram(
    gl,
    genShader(gl, gl.VERTEX_SHADER, vertexShaderSource),
    genShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  );
}

// 清空画布
export function clear(gl: WebGLRenderingContext) {
  // Set clearColor
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export function getContext(canvas: HTMLCanvasElement) {
  return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
}

export function createBuffer(gl: WebGLRenderingContext, attribute: number, vertexAttribPointer: VertexAttribPointerConfig): WebGLBuffer {
  let {size, type, normalized, stride, offset} = vertexAttribPointer;
  const buffer = gl.createBuffer();
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(
    attribute,
    size,
    type || gl.FLOAT,
    normalized || false,
    stride || 0,
    offset || 0
  )
  return buffer;
}

/**
 * 把索引数组转换成直接用来绘制的顶点数组
 * @param data
 * @param countPerElement
 */
export function transformUnIndices(data: GeometryElementData, countPerElement: number = 7): Float32Array {
  return Float32Array.from(data.indices.reduce((acc: number[], value) => {
    acc.push(...data.vertices.slice(value * countPerElement, (value + 1) * countPerElement));
    return acc;
  }, []));
}
