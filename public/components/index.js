"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtiesRouter = exports.CheckupRouter = exports.Patient_Router = exports.DoctorRouter = void 0;
var doctors_1 = require("./doctors");
Object.defineProperty(exports, "DoctorRouter", { enumerable: true, get: function () { return __importDefault(doctors_1).default; } });
var patient_1 = require("./patient");
Object.defineProperty(exports, "Patient_Router", { enumerable: true, get: function () { return __importDefault(patient_1).default; } });
var checkup_1 = require("./checkup");
Object.defineProperty(exports, "CheckupRouter", { enumerable: true, get: function () { return __importDefault(checkup_1).default; } });
var specialties_1 = require("./specialties");
Object.defineProperty(exports, "SpecialtiesRouter", { enumerable: true, get: function () { return __importDefault(specialties_1).default; } });
