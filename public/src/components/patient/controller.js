"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_patient = exports.delete_patient = exports.update_patient = exports.get_one_patient = exports.get_all_patient = exports.create_patient = void 0;
const supabase_1 = require("../../services/supabase");
const responses_1 = require("../../responses");
const strings_1 = require("../../utils/strings");
const auth_1 = require("../auth/auth");
const twilio_1 = require("../../twilio/twilio");
const create_patient = async (req, res) => {
    try {
        const { body } = req;
        if (!(body.email.includes("@") && body.email.includes(".com")))
            return (0, responses_1.failure)({ res, message: "Incorrect email" });
        if (!body.email || !body.password) {
            return (0, responses_1.failure)({ res, message: "Username and password are required." });
        }
        body.password = (0, strings_1.hash_password)(body.password);
        const { data } = await supabase_1.supabase.from("Patient").insert(body).select();
        (0, twilio_1.send_message)(req, res);
        return (0, responses_1.success)({
            res,
            message: "User create successfully",
            data,
        });
    }
    catch (error) {
        console.log(error);
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.create_patient = create_patient;
const get_all_patient = async (_req, res) => {
    try {
        const { data } = await supabase_1.supabase
            .from("Patient")
            .select("id, firstname, lastname, phone, age, email, password");
        if (data?.length === 0) {
            return (0, responses_1.failure)({ res, message: "Patients do not exist" });
        }
        return (0, responses_1.success)({ res, data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.get_all_patient = get_all_patient;
const get_one_patient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await supabase_1.supabase
            .from("Patient")
            .select("id, firstname, lastname, phone, age, email, password")
            .match({ id });
        if (data.data?.length === 0) {
            return (0, responses_1.failure)({ res, message: "Patient do not exist" });
        }
        return (0, responses_1.success)({ res, data: data.data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.get_one_patient = get_one_patient;
const update_patient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { body } = req;
        if (body.password) {
            body.password = (0, strings_1.hash_password)(body.password);
        }
        const datetime = new Date().toISOString();
        body.update_at = datetime;
        const { data } = await supabase_1.supabase
            .from("Patient")
            .update({ ...body })
            .match({ id })
            .select();
        if (data?.length === 0) {
            return (0, responses_1.failure)({ res, message: "Patient not exist" });
        }
        return (0, responses_1.success)({ res, message: "User updated successfully", data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update_patient = update_patient;
const delete_patient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { data } = await supabase_1.supabase.from("Patient").delete().match({ id });
        return (0, responses_1.success)({ res, message: "User deleted succesfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.delete_patient = delete_patient;
const login_patient = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await supabase_1.supabase
            .from("Patient")
            .select("id, firstname, lastname, phone, age, email, password")
            .match({ email });
        if (data.data) {
            (0, strings_1.compare_password)(data.data[0].password, password);
            const datetime = new Date().toISOString();
            const last_session = await supabase_1.supabase
                .from("Patient")
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
exports.login_patient = login_patient;
