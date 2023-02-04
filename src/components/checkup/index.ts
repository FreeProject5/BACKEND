import { Router } from "express";
import *  as Controller from "./controller2";

const CheckupRouter: Router = Router();

CheckupRouter.post("/", Controller.add_doctor);
CheckupRouter.post("/addspecialty", Controller.add_specialty)

export default CheckupRouter;
