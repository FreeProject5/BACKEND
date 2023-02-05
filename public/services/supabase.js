"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_patient = exports.get_patient = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = require("dotenv");
const responses_1 = require("../responses");
(0, dotenv_1.config)();
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY);
const get_patient = async (_req, res) => {
    const posts = await exports.supabase.from("Patient").select("*");
    return (0, responses_1.success)({ res, message: "All patient", data: posts });
};
exports.get_patient = get_patient;
const post_patient = async (req, res) => {
    const { body } = req;
    const data = await exports.supabase.from("Patient").insert(body).select();
    return (0, responses_1.success)({
        res,
        message: "Patient created successfully",
        data: data.data
    });
};
exports.post_patient = post_patient;
