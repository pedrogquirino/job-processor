import { Job } from "../Job";
import { IAgrupador } from "./IAgrupador";

const TEMPO_ESTIMADO_LIMITE = 8;

export class AgrupadorPorJanelaETempoEstimadoEDataLimite implements IAgrupador {
  agrupa(jobs: Job[], janelaInicio: Date, janelaFim: Date): number[][] {
    let jobsAgrupados: [number[]] = [[]];

    // Retornando uma lista vazia em caso de não ser passado Job
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

    // Retornando uma lista vazia em caso de serem excluidos todos os jobs
    if (jobslist.length === 0) {
      return jobsAgrupados;
    }

    // Retornando em caso de um único Job a processar
    if (jobslist.length === 1) {
      if(jobslist[0].tempoEstimado > TEMPO_ESTIMADO_LIMITE){
        return jobsAgrupados;
      }
      else {
        jobsAgrupados[0][0] = jobslist[0].id;
        return jobsAgrupados;
      }
    }

    jobsAgrupados[0][0] = jobslist[0].id;

    let soma = jobslist[0].tempoEstimado;
    janelaInicio.setHours(janelaInicio.getHours() + jobslist[0].tempoEstimado);

    let horaFimJob = janelaInicio;

    for (var i = 1, j = 0; i < jobslist.length; i++) {
      horaFimJob.setHours(horaFimJob.getHours() + jobslist[i].tempoEstimado);

      let jobFinalizaDentroDaJanelaELimite =
        horaFimJob <= janelaFim &&
        horaFimJob <= jobslist[i].dataLimiteConclusao;

      soma += jobslist[i].tempoEstimado;

      // Caso a soma dos jobs do conjunto alcance o limite, é criado um novo conjunto
      if (soma > TEMPO_ESTIMADO_LIMITE && jobFinalizaDentroDaJanelaELimite) {
        soma = 0;
        j++;
        jobsAgrupados[j] = [];
      }

      if (jobFinalizaDentroDaJanelaELimite) {
        jobsAgrupados[j].push(jobslist[i].id);
      }
    }
    return jobsAgrupados;
  }
}
