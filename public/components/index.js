"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient_Router = exports.DoctorRouter = void 0;
var doctors_1 = require("./doctors");
Object.defineProperty(exports, "DoctorRouter", { enumerable: true, get: function () { return __importDefault(doctors_1).default; } });
var patient_1 = require("./patient");
Object.defineProperty(exports, "Patient_Router", { enumerable: true, get: function () { return __importDefault(patient_1).default; } });
