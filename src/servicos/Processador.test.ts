import { Processador } from "./Processador";
import { AgrupadorPorJanelaETempoEstimadoEDataLimite } from "../jobs/agrupadores/AgrupadorPorJanelaETempoEstimadoEDataLimite";
import { Job } from "../jobs/Job";

describe("ProcessadorJobs", () => {
  const processador = new Processador();
  const agrupadorPorJanelaETempoEstimadoEDataLimite = new AgrupadorPorJanelaETempoEstimadoEDataLimite();

  test("deveRetornarUmaListaVaziaAoPassarUmJobComMaisDeOitoHoras", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(1,"Importação de arquivos de fundos",new Date("2019-11-11T15:00:00.000Z"),9)
    ];

    expect(
      processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[]]);
  });

  test("deveRetornarUmaListaComUmConjuntoDeUmJobAoPassarJobComMenosDeOitoHoras", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(1,"Importação de arquivos de fundos",new Date("2019-11-10T15:00:00.000Z"),6)
    ];

    expect(
      processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[1]]);
  });
  
  test("deveRetornarUmaListaComTresConjuntosDeJobsComTotalMaximoDeOitoHorasDeEstimativaCadaExcluindoUmJob", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(1,"Importação de arquivos de fundos",new Date("2019-11-10T15:00:00.000Z"),2),
      new Job(2,"Importação de dados da Base Legada",new Date("2019-11-10T13:00:00.000Z"),4),
      new Job(3,"Importação de dados de integração",new Date("2019-11-10T20:00:00.000Z"),3),
      new Job(4,"Importação de dados de integração",new Date("2019-11-10T08:00:00.000Z"),8),
      new Job(5,"Importação de dados de integração",new Date("2019-11-11T08:00:00.000Z"),4),
      new Job(6,"Importação de dados de integração",new Date("2019-11-11T12:00:00.000Z"),5),
      new Job(7,"Importação de dados de integração",new Date("2019-11-11T12:00:00.000Z"),7),
    ];

    expect(
      processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[2,1],[3,5],[6,7]]);
  });

  test("deveRetornarUmaListaComDoisConjuntosDeJobsComTotalMaximoDeOitoHorasDeEstimativaCada", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(1,"Importação de arquivos de fundos",new Date("2019-11-10T12:00:00.000Z"),2),
      new Job(2,"Importação de dados da Base Legada",new Date("2019-11-11T12:00:00.000Z"),4),
      new Job(3,"Importação de dados de integração",new Date("2019-11-11T08:00:00.000Z"),6),
    ];

    expect(processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[1, 3], [2]]);
  });

  test("deveRetornarUmaListaDeConjuntosDeJobsVaziaAoProcessarJobsComDataLimiteMenorDoQueInicioJanela", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(1,"Importação de arquivos de fundos",new Date("2019-11-09T12:00:00.000Z"),2),
      new Job(2,"Importação de dados da Base Legada",new Date("2019-11-10T08:00:00.000Z"),4),
      new Job(3,"Importação de dados de integração",new Date("2019-11-08T15:00:00.000Z"),6),
    ];

    expect(
      processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[]]);
  });

  test("deveRetornarApenasOsJobsQueTeraoTempoSuficienteParaConclusao", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(1,"Importação de arquivos de fundos",new Date("2019-11-10T12:00:00.000Z"),4),
      new Job(2,"Importação de dados da Base Legada",new Date("2019-11-11T12:00:00.000Z"),4),
      new Job(3,"Importação de dados de integração",new Date("2019-11-11T08:00:00.000Z"),6),
    ];

    expect(
      processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[3], [2]]);
  });

  test("deveRetornarUmaListaComOsJobsQueFinalizaraoDentroDaJanela", () => {
    const janelaInicio = new Date("2019-11-10T09:00:00.000Z");
    const janelaFim = new Date("2019-11-10T12:00:00.000Z");

    const jobs: Job[] = [
      new Job(1,"Importação de arquivos de fundos",new Date("2019-11-10T12:00:00.000Z"),2),
      new Job(2,"Importação de dados da Base Legada",new Date("2019-11-11T12:00:00.000Z"),4),
      new Job(3,"Importação de dados de integração",new Date("2019-11-11T08:00:00.000Z"),6),
    ];

    expect(
      processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[1]]);
  });

  test("deveRetornarUmaListaDeConjuntosDeJobsVaziaAoPassarUmaListaDeJobsVazia", () => {
    const jobs: Job[] = [];

    const janelaInicio = new Date("2019-11-10T09:00:00.0000Z");
    const janelaFim = new Date("2019-11-11T12:00:00.000Z");

    expect(
      processador.executa(jobs,agrupadorPorJanelaETempoEstimadoEDataLimite,janelaInicio,janelaFim)
    ).toStrictEqual([[]]);
  });
});
