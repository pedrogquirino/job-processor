"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processador = void 0;
var Processador = /** @class */ (function () {
    function Processador() {
        this.jobsProntos = [];
    }
    Processador.prototype.executa = function (jobs, agrupador, janelaInicio, janelaFim) {
        return agrupador.agrupa(jobs, janelaInicio, janelaFim);
    };
    return Processador;
}());
exports.Processador = Processador;
