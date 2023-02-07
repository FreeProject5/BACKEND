"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckup_byDoctor = exports.getCheckup_byPatient = exports.update_checkup = exports.delete_checkup = exports.get_checkup = exports.add_checkup = void 0;
const supabase_1 = require("../../services/supabase");
const responses_1 = require("../../responses");
const add_checkup = async (req, res) => {
    try {
        const data = req.body;
        const addcheckup = await supabase_1.supabase.from("Checkup").insert(data).select();
        return (0, responses_1.success)({
            res,
            message: "Checkup added succesfully",
            data: addcheckup.data
        });
    }
    catch (error) {
        console.log(error);
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.add_checkup = add_checkup;
const get_checkup = async (req, res) => {
    try {
        const getcheckup = await supabase_1.supabase.from("Checkup").select("*");
        return (0, responses_1.success)({
            res,
            message: "All checkups",
            data: getcheckup.data
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.get_checkup = get_checkup;
const delete_checkup = async (req, res) => {
    try {
        const { id } = req.params;
        const deletecheckup = await supabase_1.supabase.from("Checkup").delete().match({ "id": id });
        return (0, responses_1.success)({
            res,
            message: "Checkup deleted succesfully",
            data: deletecheckup.data
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.delete_checkup = delete_checkup;
const update_checkup = async (req, res) => {
    try {
        const { id } = req.params;
        const checkup = req.body;
        const updatecheckup = await supabase_1.supabase.from("Checkup").update({ ...checkup }).eq("id", id).select();
        return (0, responses_1.success)({
            res,
            message: "Checkup updated succesfully",
            data: updatecheckup.data
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.update_checkup = update_checkup;
const getCheckup_byPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const getcheckupbypatient = await supabase_1.supabase.from("Checkup").select("id_patient, Patient(firstname, lastname), id_specialtie, Specialties(name),id_doctor,Doctor(firstname, lastname), checkup_date, checkup_time").in("id_patient", [id]);
        return (0, responses_1.success)({
            res,
            message: "Checkup by Patient",
            data: getcheckupbypatient.data
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.getCheckup_byPatient = getCheckup_byPatient;
const getCheckup_byDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const getcheckupbydoctor = await supabase_1.supabase.from("Checkup").select("id_patient, Patient(firstname, lastname), id_specialtie, Specialties(name),id_doctor,Doctor(firstname, lastname), checkup_date, checkup_time").in("id_doctor", [id]);
        return (0, responses_1.success)({
            res,
            message: "Checkup by Doctor",
            data: getcheckupbydoctor.data
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.getCheckup_byDoctor = getCheckup_byDoctor;
