import { Job } from "../Job";
import { IAgrupador } from "./IAgrupador";

//const TEMPO_ESTIMADO_LIMITE = 8;

export class AgrupadorPorJanelaETempoEstimadoEDataLimite implements IAgrupador {
  agrupa(jobs: Job[], janelaInicio: Date, janelaFim: Date): number[][] {
    console.log(janelaFim);
    let jobsAgrupados: [number[]] = [[]];

    if (jobs.length === 0) {
      return jobsAgrupados;
    }

    const jobslist = jobs
      //Ordenando pela data limite de conclusão
      .sort((jobA, jobB) => {
        return jobA.dataLimiteConclusao < jobB.dataLimiteConclusao
          ? -1
          : jobA.dataLimiteConclusao > jobB.dataLimiteConclusao
          ? 1
          : 0;
      })

      .filter((job) => {
        return (
          //filtrando os jobs que terão tempo suficiente para serem executados após o inicio da janela
          job.dataLimiteConclusao.getTime() / 3600000 -
            janelaInicio.getTime() / 3600000 >=
          job.tempoEstimado
        );
      });

    if (jobslist.length === 0) {
      return jobsAgrupados;
    }

    let soma = jobslist[0].tempoEstimado;

    jobsAgrupados[0][0] = jobslist[0].id;

    for (var i = 1, j = 0; i < jobslist.length; i++) {
      soma += jobslist[i].tempoEstimado;
      if (soma > 8) {
        soma = 0;
        j++;
        jobsAgrupados[j] = [];
      }

      jobsAgrupados[j].push(jobslist[i].id);
    }

    return jobsAgrupados;
  }
}
