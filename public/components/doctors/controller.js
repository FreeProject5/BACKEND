"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll_schedule = exports.deletee = exports.create_doctor = exports.Registration_horario = exports.modify_datos = exports.findAll = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const responses_1 = require("../../responses");
const findAll = async (req, res) => {
    try {
        let Doctors = await datasource_1.default.doctor.findMany({ include: { schedule: true } });
        return (0, responses_1.success)({ res, data: Doctors });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll = findAll;
const modify_datos = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const data_medico = await datasource_1.default.doctor.update({
            where: { id },
            data: data,
        });
        return (0, responses_1.success)({ res, data: data_medico });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.modify_datos = modify_datos;
const Registration_horario = async (req, res) => {
    try {
        const data = req.body;
        const schedule = await datasource_1.default.schedule.create({
            data
        });
        return (0, responses_1.success)({ res, data: schedule });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.Registration_horario = Registration_horario;
const create_doctor = async (req, res) => {
    try {
        const data = req.body;
        const medico = await datasource_1.default.doctor.create({
            data: data,
        });
        return (0, responses_1.success)({ res, data: medico });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.create_doctor = create_doctor;
const deletee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const doctor = await datasource_1.default.doctor.delete({
            where: {
                id,
            },
        });
        return (0, responses_1.success)({ res, data: doctor });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.deletee = deletee;
const findAll_schedule = async (req, res) => {
    try {
        let Doctors = await datasource_1.default.schedule.findMany();
        return (0, responses_1.success)({ res, data: Doctors });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll_schedule = findAll_schedule;
