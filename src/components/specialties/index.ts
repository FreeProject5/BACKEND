import { Router } from "express";
import *  as Controller from "./controller";

const SpecialtiesRouter: Router = Router();

SpecialtiesRouter.post("/", Controller.add_specialties)
SpecialtiesRouter.get("/", Controller.get_specialties)
SpecialtiesRouter.delete("/:id", Controller.delete_specialties)
SpecialtiesRouter.put("/update/:id", Controller.update_specialty)
SpecialtiesRouter.get("/byspecialty/:id", Controller.getDoctorsBySpecialty)

export default SpecialtiesRouter;
