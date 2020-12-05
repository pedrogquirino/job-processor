"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgrupadorPorJanelaETempoEstimadoEDataLimite = void 0;
//const TEMPO_ESTIMADO_LIMITE = 8;
var AgrupadorPorJanelaETempoEstimadoEDataLimite = /** @class */ (function () {
    function AgrupadorPorJanelaETempoEstimadoEDataLimite() {
    }
    AgrupadorPorJanelaETempoEstimadoEDataLimite.prototype.agrupa = function (jobs, janelaInicio, janelaFim) {
        var jobsAgrupados = [[]];
        if (jobs.length === 0) {
            return jobsAgrupados;
        }
        var jobslist = jobs
            //Ordenando pela data limite de conclusão
            .sort(function (jobA, jobB) {
            return jobA.dataLimiteConclusao < jobB.dataLimiteConclusao
                ? -1
                : jobA.dataLimiteConclusao > jobB.dataLimiteConclusao
                    ? 1
                    : 0;
        })
            .filter(function (job) {
            return (
            //filtrando os jobs que terão tempo suficiente para serem executados após o inicio da janela
            job.dataLimiteConclusao.getTime() / 3600000 -
                janelaInicio.getTime() / 3600000 >=
                job.tempoEstimado);
        });
        if (jobslist.length === 0) {
            return jobsAgrupados;
        }
        jobsAgrupados[0][0] = jobslist[0].id;
        var soma = jobslist[0].tempoEstimado;
        janelaInicio.setHours(janelaInicio.getHours() + jobslist[0].tempoEstimado);
        var horaFimJob = janelaInicio;
        for (var i = 1, j = 0; i < jobslist.length; i++) {
            horaFimJob.setHours(horaFimJob.getHours() + jobslist[i].tempoEstimado);
            var jobFinalizaDentroDaJanelaELimite = horaFimJob <= janelaFim &&
                horaFimJob <= jobslist[i].dataLimiteConclusao;
            soma += jobslist[i].tempoEstimado;
            if (soma > 8 && jobFinalizaDentroDaJanelaELimite) {
                soma = 0;
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
