import { Router } from "express";
import * as Controller from "./controller";

const DoctorRouter: Router = Router();

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


export default DoctorRouter;