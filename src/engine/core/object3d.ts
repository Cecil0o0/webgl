import Model from './model';

export default class Object3D {
  program: WebGLProgram;
  model: Model;
  primitive: string;
  renderType: string;
  constructor({
    model,
    program,
    primitive = 'TRIANGLES',
    renderType = 'drawElements',
  }: {
  model: Model;
  primitive?: string;
  renderType?: string;
  program?: WebGLProgram
  }) {
    this.model = model;
    this.primitive = primitive;
    this.renderType = renderType;
    this.program = program
  }
}
