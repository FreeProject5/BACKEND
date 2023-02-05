"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne_schedule = exports.findAll_schedule = exports.deletee = exports.create_doctor = exports.Registration_horario = exports.modify_datos = exports.findOne_doctor = exports.findAll = void 0;
const responses_1 = require("../../responses");
const supabase_1 = require("../../services/supabase");
const findAll = async (req, res) => {
    try {
        //let Doctors = await prisma.doctor.findMany({include: {schedule: true}} );
        const Doctors = await supabase_1.supabase.from("Doctor").select("*");
        return (0, responses_1.success)({ res, data: Doctors });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll = findAll;
const findOne_doctor = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const doctor = await supabase_1.supabase.from("Doctor").select("*").eq('id', id);
        return (0, responses_1.success)({ res, message: "Doctor found", data: doctor });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOne_doctor = findOne_doctor;
const modify_datos = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        // const data_medico=await prisma.doctor.update({
        //   where: { id },
        //   data: data,
        // });
        const data_medico = await supabase_1.supabase
            .from('Doctor')
            .update({ ...data })
            .eq('id', id)
            .select();
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
        // const schedule = await prisma.schedule.create({
        //   data
        //     })
        const schedule = await supabase_1.supabase.from("Schedule").insert(data).select();
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
        // const medico= await prisma.doctor.create({
        //   data: data,
        // });
        const medico = await supabase_1.supabase.from("Doctor").insert(data).select();
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
        // const doctor = await prisma.doctor.delete({
        //   where: {
        //     id,
        //   },
        // });
        const doctor = await supabase_1.supabase
            .from('Doctor')
            .delete()
            .eq('id', id);
        return (0, responses_1.success)({ res, data: doctor });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.deletee = deletee;
const findAll_schedule = async (req, res) => {
    try {
        //let Doctors = await prisma.schedule.findMany();
        const Schedule = await supabase_1.supabase.from("Schedule").select("*");
        return (0, responses_1.success)({ res, data: Schedule });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll_schedule = findAll_schedule;
const findOne_schedule = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const schedule = await supabase_1.supabase.from("Schedule").select("*").eq('id', id);
        return (0, responses_1.success)({ res, message: "Schedule found", data: schedule });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOne_schedule = findOne_schedule;
