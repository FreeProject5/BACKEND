"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorsBySpecialty = exports.update_specialty = exports.delete_specialties = exports.get_specialties = exports.add_specialties = void 0;
const supabase_1 = require("../../services/supabase");
const responses_1 = require("../../responses");
const add_specialties = async (req, res) => {
    try {
        const { body } = req;
        const addspecialties = await supabase_1.supabase
            .from("Specialties")
            .insert(body)
            .select();
        return (0, responses_1.success)({
            res,
            message: "Specialty added succesfully",
            data: addspecialties.data,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.add_specialties = add_specialties;
const get_specialties = async (req, res) => {
    try {
        const getspecialties = await supabase_1.supabase.from("Specialties").select("*");
        return (0, responses_1.success)({
            res,
            message: "All specialties",
            data: getspecialties.data,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.get_specialties = get_specialties;
const delete_specialties = async (req, res) => {
    try {
        const { id } = req.params;
        const deletespecialties = await supabase_1.supabase
            .from("Specialties")
            .delete()
            .match({ id: id });
        return (0, responses_1.success)({
            res,
            message: "Specialty deleted succesfully",
            data: deletespecialties.data,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.delete_specialties = delete_specialties;
const update_specialty = async (req, res) => {
    try {
        const { id } = req.params;
        const specialty = req.body;
        const updateSpecialty = await supabase_1.supabase
            .from("Specialties")
            .update({ ...specialty })
            .eq("id", id)
            .select();
        return (0, responses_1.success)({
            res,
            message: "Specialty updated succesfully",
            data: updateSpecialty.data,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({
            res,
            message: error,
        });
    }
};
exports.update_specialty = update_specialty;
const getDoctorsBySpecialty = async (req, res) => {
    try {
        const { id } = req.params;
        const doctorsbyspe = await supabase_1.supabase
            .from("Doctor")
            .select("firstname, lastname")
            .in("specialty", [id]);
        return (0, responses_1.success)({
            res,
            message: "Doctors by specialty",
            data: doctorsbyspe.data,
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
exports.getDoctorsBySpecialty = getDoctorsBySpecialty;
