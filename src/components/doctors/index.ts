import { Router } from "express";
import * as Controller from "./controller";

const DoctorRouter: Router = Router();

//DoctorRouter.get("/doctor", Controller.);
//DoctorRouter.get("/doctor/:id", Controller.findOne);
DoctorRouter.get("/doctor", Controller.findAll);
DoctorRouter.put("/doctor/:id", Controller.modify_datos);
DoctorRouter.post("/doctor", Controller.create_doctor);
DoctorRouter.post("/doctor/RegistrationHorario", Controller.Registration_horario);
DoctorRouter.delete("/doctor", Controller.deletee);


export default DoctorRouter;