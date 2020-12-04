import { Job } from "../Job";
import { IAgrupador } from "./IAgrupador";

//const TEMPO_ESTIMADO_LIMITE = 8;

export class AgrupadorPorJanelaETempoEstimadoEDataLimite implements IAgrupador {
  agrupa(_jobs: Job[], _janelaInicio: Date, _janelaFim: Date): number[][] {
    let jobsAgrupados: number[][] = [[]];

    if (_jobs.length === 0) {
      return jobsAgrupados;
    }
    return jobsAgrupados;
  }
}
