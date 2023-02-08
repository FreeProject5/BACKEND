"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_Doctor = exports.findOne_schedule = exports.findAll_schedule = exports.delete_doctor = exports.create_doctor = exports.Registration_horario = exports.update_patient = exports.findOne_doctor = exports.findAll_doctor = void 0;
const responses_1 = require("../../responses");
const supabase_1 = require("../../services/supabase");
const strings_1 = require("../../utils/strings");
const auth_1 = require("../auth/auth");
const findAll_doctor = async (req, res) => {
    try {
        //let Doctors = await prisma.doctor.findMany({include: {schedule: true}} );
        const Doctors = await supabase_1.supabase.from("Doctor").select("*");
        return (0, responses_1.success)({ res, data: Doctors });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll_doctor = findAll_doctor;
const findOne_doctor = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const doctor = await supabase_1.supabase.from("Doctor").select("*").eq('id', id);
        if (doctor && doctor.data && doctor.data.length === 0) {
            return (0, responses_1.failure)({ res, message: "Doctor not found" });
        }
        return (0, responses_1.success)({ res, message: "Doctor found", data: doctor });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOne_doctor = findOne_doctor;
const update_patient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { body } = req;
        if (body.password) {
            body.password = (0, strings_1.hash_password)(body.password);
        }
        const { data } = await supabase_1.supabase
            .from("Doctor")
            .update({ ...body })
            .match({ id })
            .select();
        if (data?.length === 0) {
            return (0, responses_1.failure)({ res, message: "Doctor not exist" });
        }
        return (0, responses_1.success)({ res, message: "Doctor updated successfully", data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update_patient = update_patient;
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
        if (!(data.email.includes("@") && data.email.includes(".com")))
            return (0, responses_1.failure)({ res, message: "Incorrect email" });
        if (!data.email || !data.password) {
            return (0, responses_1.failure)({ res, message: "Username and password are required." });
        }
        data.password = (0, strings_1.hash_password)(data.password);
        // const medico= await prisma.doctor.create({
        //   data: data,
        // });
        console.log("llegó");
        const medico = await supabase_1.supabase.from("Doctor").insert(data).select();
        return (0, responses_1.success)({ res, data: medico });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.create_doctor = create_doctor;
const delete_doctor = async (req, res) => {
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
        // if (doctor.status=204){
        //    return failure({ res, message: "Doctor to delete not found" });
        //  }
        return (0, responses_1.success)({ res, message: "Doctor deleted", data: doctor });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.delete_doctor = delete_doctor;
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
        if (schedule && schedule.data && schedule.data.length === 0) {
            return (0, responses_1.failure)({ res, message: "Schedule not found" });
        }
        return (0, responses_1.success)({ res, message: "Schedule found", data: schedule });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOne_schedule = findOne_schedule;
const login_Doctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await supabase_1.supabase
            .from("Doctor")
            .select("id, firstname, lastname, specialty, email, password")
            .match({ email });
        console.log(data);
        if (data.data) {
            (0, strings_1.compare_password)(data.data[0].password, password);
            const datetime = new Date().toISOString();
            const last_session = await supabase_1.supabase
                .from("Doctor")
                .update({ last_session: datetime })
                .match({ email });
            const token = (0, auth_1.generate_token)(Number(data.data[0].id));
            return (0, responses_1.success)({
                res,
                message: `Welcome!`,
                data: data.data,
                token,
            });
        }
        return (0, responses_1.failure)({ res, message: "Data does not exist or is incorrect" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.login_Doctor = login_Doctor;
