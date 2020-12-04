export class Job {
  id: number;
  descricao: string;
  dataLimiteConclusao: Date;
  tempoEstimado: number;

  constructor(
    id: number,
    descricao: string,
    dataLimiteConclusao: Date,
    tempoEstimado: number
  ) {
    this.id = id;
    this.descricao = descricao;
    this.dataLimiteConclusao = dataLimiteConclusao;
    this.tempoEstimado = tempoEstimado;
  }
}
