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

export function genProgram(gl: WebGLRenderingContext, vertexShader: string, fragmentShader: string) {
  // Create shader program
  const program = gl.createProgram();
  // Attach vertex shader to program
  gl.attachShader(program, vertexShader);
  // Attach fragment shader to program
  gl.attachShader(program, fragmentShader);

  return program;
}

// 清空画布
export function clear(gl: WebGLRenderingContext) {
  // Set clearColor
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}
