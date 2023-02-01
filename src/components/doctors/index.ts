import { Router } from "express";
import * as Controller from "./controller";

const DoctorRouter: Router = Router();

//DoctorRouter.get("/doctor", Controller.);
//DoctorRouter.get("/doctor/:id", Controller.findOne);
DoctorRouter.get("/", Controller.findAll);
DoctorRouter.put("/:id", Controller.modify_datos);
DoctorRouter.post("/", Controller.create_doctor);
DoctorRouter.post("/RegistrationHorario", Controller.Registration_horario);
DoctorRouter.delete("/", Controller.deletee);
DoctorRouter.get("/findAll_schedule", Controller.findAll_schedule);


export default DoctorRouter;