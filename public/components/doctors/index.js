"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller = __importStar(require("./controller"));
const DoctorRouter = (0, express_1.Router)();
//DoctorRouter.get("/doctor", Controller.);
//DoctorRouter.get("/doctor/:id", Controller.findOne);
DoctorRouter.get("/", Controller.findAll);
DoctorRouter.get("/:id", Controller.findOne_doctor);
DoctorRouter.put("/:id", Controller.modify_datos);
DoctorRouter.post("/", Controller.create_doctor);
DoctorRouter.delete("/:id", Controller.deletee);
DoctorRouter.post("/RegistrationHorario", Controller.Registration_horario);
DoctorRouter.get("/findAll_schedule", Controller.findAll_schedule);
DoctorRouter.get("/findAll_schedule/:id", Controller.findOne_schedule);
exports.default = DoctorRouter;
