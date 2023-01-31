import { Router } from "express";
import * as Controller from "./controller";

const patient_router = Router();

patient_router.post("/", Controller.create_patient);
patient_router.post("/login", Controller.login_patient);
patient_router.get("/", Controller.get_patient);
patient_router.put("/:id", Controller.update_patient);
patient_router.delete("/:id", Controller.delete_patient);

export default patient_router;
