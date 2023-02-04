import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";
import { config } from "dotenv";
import { success} from "../responses";

config();

export const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL as string,
  process.env.SUPABASE_API_KEY as string
);

export const get_patient = async (_req: Request, res: Response) => {
  const posts = await supabase.from("Patient").select("*");
  return success({ res, message: "All patient", data: posts });
};

export const post_patient = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await supabase.from("Patient").insert(body).select();
  return success({
    res,
    message: "Patient created successfully",
    data: data.data
  });
};
