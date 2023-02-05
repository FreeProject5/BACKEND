import express, { type Application } from "express";
import cors from "cors";
import routes from "./router";
import { get_patient, post_patient } from "./services/supabase";
const app: Application = express();

app.use(cors());
app.use(express.json());

routes(app);
