export function genShader(gl, shaderType, shaderSourceCode) {
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

export function genProgram(gl, vertexShader, fragmentShader) {
  // Create shader program
  const program = gl.createProgram();
  // Attach vertex shader to program
  gl.attachShader(program, vertexShader);
  // Attach fragment shader to program
  gl.attachShader(program, fragmentShader);

  return program;
}
