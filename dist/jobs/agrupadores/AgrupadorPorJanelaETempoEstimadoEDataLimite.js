"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgrupadorPorJanelaETempoEstimadoEDataLimite = void 0;
var TEMPO_ESTIMADO_LIMITE_POR_CONJUNTO_DE_JOBS = 8;
var AgrupadorPorJanelaETempoEstimadoEDataLimite = /** @class */ (function () {
    function AgrupadorPorJanelaETempoEstimadoEDataLimite() {
    }
    AgrupadorPorJanelaETempoEstimadoEDataLimite.prototype.agrupa = function (jobs, janelaInicio, janelaFim) {
        var jobsAgrupados = [[]];
        // Retornando uma lista vazia em caso de não ser passado Job
        if (jobs.length === 0) {
            return jobsAgrupados;
        }
        // Aplicando filtragem e ordenação da lista de jobs
        var jobslist = jobs
            //Ordenando pela data limite de conclusão
            .sort(function (jobA, jobB) {
            return jobA.dataLimiteConclusao < jobB.dataLimiteConclusao ? -1 : jobA.dataLimiteConclusao > jobB.dataLimiteConclusao ? 1 : 0;
        })
            //filtrando os jobs que terão tempo suficiente para serem executados após o inicio da janela
            .filter(function (job) {
            return (job.dataLimiteConclusao.getTime() / 3600000 - janelaInicio.getTime() / 3600000 >= job.tempoEstimado);
        });
        // Retornando uma lista vazia em caso de serem excluidos todos os jobs
        if (jobslist.length === 0) {
            return jobsAgrupados;
        }
        // Retornando em caso de um único Job a processar
        if (jobslist.length === 1) {
            if (jobslist[0].tempoEstimado > TEMPO_ESTIMADO_LIMITE_POR_CONJUNTO_DE_JOBS) {
                return jobsAgrupados;
            }
            else {
                jobsAgrupados[0][0] = jobslist[0].id;
                return jobsAgrupados;
            }
        }
        // Setando o primeiro item da lista jobs
        jobsAgrupados[0][0] = jobslist[0].id;
        var somaTempoEstimadoConjunto = jobslist[0].tempoEstimado;
        janelaInicio.setHours(janelaInicio.getHours() + jobslist[0].tempoEstimado);
        var horaFimJob = janelaInicio;
        // Iterando pela lista de jobs
        for (var i = 1, j = 0; i < jobslist.length; i++) {
            horaFimJob.setHours(horaFimJob.getHours() + jobslist[i].tempoEstimado);
            var jobFinalizaDentroDaJanelaELimite = horaFimJob <= janelaFim && horaFimJob <= jobslist[i].dataLimiteConclusao;
            somaTempoEstimadoConjunto += jobslist[i].tempoEstimado;
            // Caso a soma dos jobs do conjunto alcance o limite, é criado um novo conjunto
            if (somaTempoEstimadoConjunto > TEMPO_ESTIMADO_LIMITE_POR_CONJUNTO_DE_JOBS && jobFinalizaDentroDaJanelaELimite) {
                somaTempoEstimadoConjunto = 0;
                j++;
                jobsAgrupados[j] = [];
            }
            if (jobFinalizaDentroDaJanelaELimite) {
                jobsAgrupados[j].push(jobslist[i].id);
            }
        }
        return jobsAgrupados;
    };
    return AgrupadorPorJanelaETempoEstimadoEDataLimite;
}());
exports.AgrupadorPorJanelaETempoEstimadoEDataLimite = AgrupadorPorJanelaETempoEstimadoEDataLimite;
