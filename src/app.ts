import express, { type Application } from "express";
import cors from "cors";
import routes from "./router";

const app: Application = express();

app.use(cors());
app.use(express.json());

routes(app);

//app.get("/", (req, res) => res.send("hola mundo"))

export default app;