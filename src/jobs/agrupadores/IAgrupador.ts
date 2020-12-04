import { Job } from "../Job";

export interface IAgrupador {
  classifica(jobs: Job[], janelaInicio: Date, janelaFim: Date): number[][];
}
