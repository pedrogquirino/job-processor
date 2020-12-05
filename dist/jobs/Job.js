"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
var Job = /** @class */ (function () {
    function Job(id, descricao, dataLimiteConclusao, tempoEstimado) {
        this.id = id;
        this.descricao = descricao;
        this.dataLimiteConclusao = dataLimiteConclusao;
        this.tempoEstimado = tempoEstimado;
    }
    return Job;
}());
exports.Job = Job;
