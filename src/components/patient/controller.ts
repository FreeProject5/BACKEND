import { Request, response, Response } from "express";
import { supabase } from "../../services/supabase";
import { success, failure } from "../../responses";
import { hash_password, compare_password } from "../../utils/strings";
import { generate_token, verify_token } from "../auth/auth";
import { User } from "../interfaces";
import { PostgrestResponse } from "@supabase/supabase-js";

const patient = supabase.from("Patient");

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
    const { data } = await patient.insert(body).select();
    return success({
      res,
      message: "User create successfully",
      data,
    });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const get_patient = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { data } = await patient.select(
      "id, firstname, lastname, phone, age, email, password"
    );
    return success({ res, data });
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
    const { data } = await patient.update({ data: body }).match({ id });
    return success({ res, message: "User updated successfully", data });
  } catch (error) {
    console.log(error);
    return failure({ res, message: error });
  }
};

export const delete_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const { data } = await patient.delete().match({ id });
    return success({ res, message: "User deleted succesfully" });
  } catch (error) {
    return failure({ res, message: error });
  }
};

// export const login_patient = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { email, password } = req.body;
//     const { data }: PostgrestResponse<User>  = await patient
//       .select("id, firstname, lastname, phone, age, email, password")
//       .match({ email });
//     const {user} = data.data: PostgrestResponse<User>;
//     if (!compare_password(user, password)) {
//       return failure({ res, message: "Data does not exist or is incorrect" });
//     } else {
//       const datetime = new Date().toISOString();
//       const last_session = await patient.update({
//         where: { email },
//         data: { last_session: datetime },
//       });
//       const token: string = generate_token(Number(user?.id));
//       return success({
//         res,
//         message: `Welcome!`,
//         data: user,
//         token,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return failure({ res, message: error });
//   }
// };
