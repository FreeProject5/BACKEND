"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_patient = exports.update_patient = exports.get_patient = exports.create_patient = void 0;
const supabase_1 = require("../../services/supabase");
const responses_1 = require("../../responses");
const strings_1 = require("../../utils/strings");
const patient = supabase_1.supabase.from("Patient");
const create_patient = async (req, res) => {
    try {
        const { body } = req;
        if (!(body.email.includes("@") && body.email.includes(".com")))
            return (0, responses_1.failure)({ res, message: "Incorrect email" });
        if (!body.email || !body.password) {
            return (0, responses_1.failure)({ res, message: "Username and password are required." });
        }
        body.password = (0, strings_1.hash_password)(body.password);
        const { data } = await patient.insert(body).select();
        return (0, responses_1.success)({
            res,
            message: "User create successfully",
            data,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.create_patient = create_patient;
const get_patient = async (_req, res) => {
    try {
        const { data } = await patient.select("id, firstname, lastname, phone, age, email, password");
        return (0, responses_1.success)({ res, data });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.get_patient = get_patient;
const update_patient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { body } = req;
        if (body.password) {
            body.password = (0, strings_1.hash_password)(body.password);
        }
        const { data } = await patient.update({ data: body }).match({ id });
        return (0, responses_1.success)({ res, message: "User updated successfully", data });
    }
    catch (error) {
        console.log(error);
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update_patient = update_patient;
const delete_patient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { data } = await patient.delete().match({ id });
        return (0, responses_1.success)({ res, message: "User deleted succesfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.delete_patient = delete_patient;
// export const login_patient = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { email, password } = req.body;
//     const { data }: PostgrestResponse<User>  = await patient
//       .select("id, firstname, lastname, phone, age, email, password")
//       .match({ email });
//     const {user} = data.data: PostgrestResponse<User>;
//     if (!compare_password(user, password)) {
//       return failure({ res, message: "Data does not exist or is incorrect" });
//     } else {
//       const datetime = new Date().toISOString();
//       const last_session = await patient.update({
//         where: { email },
//         data: { last_session: datetime },
//       });
//       const token: string = generate_token(Number(user?.id));
//       return success({
//         res,
//         message: `Welcome!`,
//         data: user,
//         token,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return failure({ res, message: error });
//   }
// };
