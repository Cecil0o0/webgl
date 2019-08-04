export default class Object3D {
  program: WebGLProgram;
  primitive: string;
  renderType: string;
  constructor({
    program,
    primitive = 'TRIANGLES',
    renderType = 'drawElements',
  }: {
    primitive?: string;
    renderType?: string;
    program?: WebGLProgram
  } = {}) {
    this.primitive = primitive;
    this.renderType = renderType;
    this.program = program
  }
}
