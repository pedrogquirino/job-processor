"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Processador_1 = require("./servicos/Processador");
var Job_1 = require("./jobs/Job");
var AgrupadorPorJanelaETempoEstimadoEDataLimite_1 = require("./jobs/agrupadores/AgrupadorPorJanelaETempoEstimadoEDataLimite");
var jobs = [
    new Job_1.Job(1, "Importação de arquivos de fundos", new Date("2019-11-10T12:00:00.000Z"), 2),
    new Job_1.Job(2, "Importação de dados da Base Legada", new Date("2019-11-11T12:00:00.000Z"), 4),
    new Job_1.Job(3, "Importação de dados de integração", new Date("2019-11-11T08:00:00.000Z"), 6),
];
(function main() {
    var processador = new Processador_1.Processador();
    var agrupadorPorJanelaETempoEstimadoEDataLimite = new AgrupadorPorJanelaETempoEstimadoEDataLimite_1.AgrupadorPorJanelaETempoEstimadoEDataLimite();
    var janelaInicio = new Date("2019-11-10T09:00:00.000Z");
    var janelaFim = new Date("2019-11-11T12:00:00.000Z");
    var jobsProntos = processador.executa(jobs, agrupadorPorJanelaETempoEstimadoEDataLimite, janelaInicio, janelaFim);
    console.log(jobsProntos);
})();
