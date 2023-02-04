"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_patient = exports.delete_patient = exports.update_patient = exports.get_patient = exports.create_patient = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const responses_1 = require("../../responses");
const strings_1 = require("../../utils/strings");
const auth_1 = require("../auth/auth");
const create_patient = async (req, res) => {
    try {
        const { body } = req;
        if (!(body.email.includes("@") && body.email.includes(".com")))
            return (0, responses_1.failure)({ res, message: "Incorrect email" });
        if (!body.email || !body.password) {
            return (0, responses_1.failure)({ res, message: "Username and password are required." });
        }
        body.password = (0, strings_1.hash_password)(body.password);
        const user = await datasource_1.default.patient.create({ data: body });
        return (0, responses_1.success)({
            res,
            message: "User create successfully",
            data: user,
        });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.create_patient = create_patient;
const get_patient = async (_req, res) => {
    try {
        const user = await datasource_1.default.patient.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                password: true,
            },
        });
        return (0, responses_1.success)({ res, data: user });
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
        const user = await datasource_1.default.patient.update({
            where: { id },
            data: body,
        });
        return (0, responses_1.success)({ res, message: "User updated successfully", data: user });
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
        const user = await datasource_1.default.patient.delete({ where: { id } });
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
        const user = await datasource_1.default.patient.findUnique({
            where: { email },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                password: true,
            },
        });
        if (!(0, strings_1.compare_password)(user?.password, password)) {
            return (0, responses_1.failure)({ res, message: "Data does not exist or is incorrect" });
        }
        else {
            const datetime = new Date().toISOString();
            const last_session = await datasource_1.default.patient.update({
                where: { email },
                data: { last_session: datetime },
            });
            const token = (0, auth_1.generate_token)(Number(user?.id));
            return (0, responses_1.success)({
                res,
                message: `Welcome!`,
                data: user,
                token,
            });
        }
    }
    catch (error) {
        console.log(error);
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.login_patient = login_patient;
