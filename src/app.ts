import express, { type Application } from "express";
import cors from "cors";
import routes from "./router";
const app: Application = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  })
);

app.use(express.json());

routes(app);

export default app;
