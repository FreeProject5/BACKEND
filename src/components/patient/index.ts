import { Router } from "express";
import * as Controller from "./controller";

const user_router = Router();

user_router.post("/", Controller.create_user);
user_router.post("/login", Controller.login_user);
user_router.get("/", Controller.get_ser);
user_router.put("/:id", Controller.update_user);
user_router.delete("/:id", Controller.delete_user);

export default user_router;
