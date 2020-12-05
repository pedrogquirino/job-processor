import { Processador } from "./Processador";
import { AgrupadorPorJanelaETempoEstimadoEDataLimite } from "../jobs/agrupadores/AgrupadorPorJanelaETempoEstimadoEDataLimite";
import { Job } from "../jobs/Job";

describe("ProcessadorJobs", () => {
  const processador = new Processador();
  const agrupadorPorJanelaETempoEstimadoEDataLimite = new AgrupadorPorJanelaETempoEstimadoEDataLimite();

  test("deveRetornarUmaListaComDoisConjuntosDeJobsComTotalMaximoDeOitoHorasDeEstimativaCada", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

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

    expect(
      processador.executa(
        jobs,
        agrupadorPorJanelaETempoEstimadoEDataLimite,
        janelaInicio,
        janelaFim
      )
    ).toStrictEqual([[1, 3], [2]]);
  });

  test("deveRetornarUmaListaDeConjuntosDeJobsVaziaAoProcessarJobsComDataLimiteMenorDoQueInicioJanela", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(
        1,
        "Importação de arquivos de fundos",
        new Date("2019-11-09T12:00:00.000Z"),
        2
      ),
      new Job(
        2,
        "Importação de dados da Base Legada",
        new Date("2019-11-10T08:00:00.000Z"),
        4
      ),
      new Job(
        3,
        "Importação de dados de integração",
        new Date("2019-11-08T15:00:00.000Z"),
        6
      ),
    ];

    expect(
      processador.executa(
        jobs,
        agrupadorPorJanelaETempoEstimadoEDataLimite,
        janelaInicio,
        janelaFim
      )
    ).toStrictEqual([[]]);
  });

  test("deveRetornarApenasOsJobsQueTeraoTempoSuficienteParaConclusao", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(
        1,
        "Importação de arquivos de fundos",
        new Date("2019-11-10T12:00:00.000Z"),
        4
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

    expect(
      processador.executa(
        jobs,
        agrupadorPorJanelaETempoEstimadoEDataLimite,
        janelaInicio,
        janelaFim
      )
    ).toStrictEqual([[3], [2]]);
  });

  test("deveRetornarUmaListaDeConjuntosDeJobsVaziaAoPassarUmaListaDeJobsVazia", () => {
    const jobs: Job[] = [];

    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    expect(
      processador.executa(
        jobs,
        agrupadorPorJanelaETempoEstimadoEDataLimite,
        janelaInicio,
        janelaFim
      )
    ).toStrictEqual([[]]);
  });
});
