import { Router } from "express";
import * as Controller from "./controller";
import { verify_token } from "../auth/auth";

const patient_router = Router();

patient_router.post("/", Controller.create_patient);
patient_router.post("/login", Controller.login_patient);
patient_router.get("/", Controller.get_all_patient);
patient_router.get("/:id", Controller.get_one_patient);
patient_router.put("/:id", Controller.update_patient);
patient_router.delete("/:id", Controller.delete_patient);

export default patient_router;
