import { Router } from "express";
import *  as Controller from "./controller";

const CheckupRouter: Router = Router();

CheckupRouter.post("/", Controller.add_checkup);
CheckupRouter.get("/", Controller.get_checkup);
CheckupRouter.delete("/:id", Controller.delete_checkup);
CheckupRouter.put("/update/:id", Controller.update_checkup);
CheckupRouter.get("/bypatient/:id", Controller.getCheckup_byPatient);
CheckupRouter.get("/bydoctor/:id", Controller.getCheckup_byDoctor);

export default CheckupRouter;
