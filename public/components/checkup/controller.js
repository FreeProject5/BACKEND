"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpecialty = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const createSpecialty = async (req, res) => {
    try {
        const { name } = req.body;
        await datasource_1.default.specialty.create({
            data: {
                name,
            },
        });
        res.status(201).json({ ok: true, message: "Specialty created successfully" });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.createSpecialty = createSpecialty;
