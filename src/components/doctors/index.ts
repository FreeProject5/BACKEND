import { Router } from "express";
import * as Controller from "./controller";

const DoctorRouter: Router = Router();

//DoctorRouter.get("/doctor", Controller.);
//DoctorRouter.get("/doctor/:id", Controller.findOne);
DoctorRouter.get("/", Controller.findAll_doctor);
DoctorRouter.get("/:id", Controller.findOne_doctor);
DoctorRouter.put("/:id", Controller.modifyDatos_doctor);
DoctorRouter.post("/", Controller.create_doctor);
DoctorRouter.delete("/:id", Controller.delete_doctor);

DoctorRouter.post("/RegistrationHorario", Controller.Registration_horario);
DoctorRouter.get("/findAll/Schedule", Controller.findAll_schedule);
DoctorRouter.get("/findAll_schedule/:id", Controller.findOne_schedule);


export default DoctorRouter;