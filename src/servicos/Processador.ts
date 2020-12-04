import { Job } from "../jobs/Job";
import { IAgrupador } from "../jobs/agrupadores/IAgrupador";

export class Processador {
  jobsProntos: Job[] = [];

  executa(
    jobs: Job[],
    agrupador: IAgrupador,
    janelaInicio: Date,
    janelaFim: Date
  ): number[][] {
    return agrupador.agrupa(jobs, janelaInicio, janelaFim);
  }
}
