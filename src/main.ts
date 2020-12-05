import { Processador } from "./servicos/Processador";
import { Job } from "./jobs/Job";
import { AgrupadorPorJanelaETempoEstimadoEDataLimite } from "./jobs/agrupadores/AgrupadorPorJanelaETempoEstimadoEDataLimite";

const jobs: Job[] = [
  new Job(
    1,
    "Importação de arquivos de fundos",
    new Date("2019-11-10T12:00:00.000Z"),
    2
  ),
  new Job(
    2,
    "Importação de dados da Base Legada",
    new Date("2019-11-11T12:00:00.000Z"),
    4
  ),
  new Job(
    3,
    "Importação de dados de integração",
    new Date("2019-11-11T08:00:00.000Z"),
    6
  ),
];

(function main() {
  const processador = new Processador();

  const agrupadorPorJanelaETempoEstimadoEDataLimite = new AgrupadorPorJanelaETempoEstimadoEDataLimite();
  const janelaInicio = new Date("2019-11-10T09:00:00.000Z");
  const janelaFim = new Date("2019-11-11T12:00:00.000Z");

  const jobsProntos = processador.executa(
    jobs,
    agrupadorPorJanelaETempoEstimadoEDataLimite,
    janelaInicio,
    janelaFim
  );

  console.log(jobsProntos);
})();
