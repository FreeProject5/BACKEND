import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";
import { config } from "dotenv";
import { success, failure } from "../responses";

config();

export const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL as string,
  process.env.SUPABASE_API_KEY as string
);

export const get_patient = async (_req: Request, res: Response) => {
  const posts = await supabase.from("Doctor").select("*");
  return success({ res, message: "All doctors", data: posts });
};

export const post_patient = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await supabase.from("Doctor").insert(body).select();
  return success({
    res,
    message: "Doctor created successfully",
    data: data.data
  });
};



export const create_doc = async (req: Request, res: Response) => {

const data = req.body;

const medico = await supabase.from("Doctor").insert(data).select();

};