import { Router } from "express";
import * as Controller from "./controller";
import { verify_token } from "../auth/auth";

const DoctorRouter: Router = Router();

//DoctorRouter.get("/doctor", Controller.);
//DoctorRouter.get("/doctor/:id", Controller.findOne);
DoctorRouter.get("/", Controller.findAll_doctor);
DoctorRouter.get("/:id", Controller.findOne_doctor);
DoctorRouter.put("/:id", verify_token, Controller.modifyDatos_doctor);
DoctorRouter.post("/", Controller.create_doctor);
DoctorRouter.delete("/:id", verify_token,Controller.delete_doctor);

DoctorRouter.post("/login_doctor", Controller.login_Doctor);

DoctorRouter.post("/RegistrationHorario", Controller.Registration_horario);
DoctorRouter.get("/findAll/Schedule", Controller.findAll_schedule);
DoctorRouter.get("/findAll_schedule/:id", Controller.findOne_schedule);


export default DoctorRouter;