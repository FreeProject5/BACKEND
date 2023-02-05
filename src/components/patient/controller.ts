import { Request, response, Response } from "express";
import { supabase } from "../../services/supabase";
import { success, failure } from "../../responses";
import { hash_password, compare_password } from "../../utils/strings";
import { generate_token } from "../auth/auth";
import { User } from "../interfaces";
import { PostgrestResponse } from "@supabase/supabase-js";

export const create_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;
    if (!(body.email.includes("@") && body.email.includes(".com")))
      return failure({ res, message: "Incorrect email" });
    if (!body.email || !body.password) {
      return failure({ res, message: "Username and password are required." });
    }
    body.password = hash_password(body.password);
    const { data } = await supabase.from("Patient").insert(body).select();
    return success({
      res,
      message: "User create successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return failure({ res, message: error });
  }
};

export const get_all_patient = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { data } = await supabase
      .from("Patient")
      .select("id, firstname, lastname, phone, age, email, password");
    return success({ res, data });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const get_one_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const data = await supabase
      .from("Patient")
      .select("id, firstname, lastname, phone, age, email, password")
      .match({ id: id });
    console.log(data);
    if (data.data?.length === 0) {
      return failure({ res, message: "Patient not exist" });
    } else {
      return success({ res, data: data.data });
    }
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const update_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const { body } = req;
    if (body.password) {
      body.password = hash_password(body.password);
    }
    const datetime = new Date().toISOString();
    body.update_at = datetime;
    const { data } = await supabase
      .from("Patient")
      .update({ ...body })
      .match({ id })
      .select();
    return success({ res, message: "User updated successfully", data });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const delete_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const { data } = await supabase.from("Patient").delete().match({ id });
    return success({ res, message: "User deleted succesfully" });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const login_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const data: PostgrestResponse<User> = await supabase
      .from("Patient")
      .select("id, firstname, lastname, phone, age, email, password")
      .match({ email });
    if (data.data) {
      compare_password(data.data[0].password, password);
      const datetime = new Date().toISOString();
      const last_session = await supabase
        .from("Patient")
        .update({ last_session: datetime })
        .match({ email });
      const token: string = generate_token(Number(data.data[0].id));
      return success({
        res,
        message: `Welcome!`,
        data: data.data,
        token,
      });
    } else {
      return failure({ res, message: "Data does not exist or is incorrect" });
    }
  } catch (error) {
    return failure({ res, message: error });
  }
};
