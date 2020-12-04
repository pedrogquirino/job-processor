import { Job } from "../Job";

export interface IAgrupador {
  agrupa(jobs: Job[], janelaInicio: Date, janelaFim: Date): number[][];
}
