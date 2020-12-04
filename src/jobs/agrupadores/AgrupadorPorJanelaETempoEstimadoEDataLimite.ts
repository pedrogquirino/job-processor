import { Job } from "../Job";
import { IAgrupador } from "./IAgrupador";

//const TEMPO_ESTIMADO_LIMITE = 8;

export class AgrupadorPorJanelaETempoEstimadoEDataLimite implements IAgrupador {
  classifica(_jobs: Job[], _janelaInicio: Date, _janelaFim: Date): number[][] {
    let jobsAgrupados: number[][] = [[]];
    return jobsAgrupados;
  }
}
