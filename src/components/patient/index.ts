import { Router } from "express";
import * as Controller from "./controller";
import { verify_token } from "../auth/auth";

const patient_router = Router();

patient_router.post("/", Controller.create_patient);
patient_router.post("/login", Controller.login_patient);
patient_router.get("/", Controller.get_patient);
patient_router.put("/:id", verify_token, Controller.update_patient);
patient_router.delete("/:id", verify_token, Controller.delete_patient);

export default patient_router;
