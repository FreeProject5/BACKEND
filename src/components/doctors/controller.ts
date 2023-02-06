import type { Request, Response } from "express";
import { success, failure } from "../../responses";
import {supabase} from "../../services/supabase";
import { hash_password, compare_password } from "../../utils/strings";
import { PostgrestResponse } from "@supabase/supabase-js";
import { User_doctor } from "../interfaces";
import { generate_token } from "../auth/auth";

export const findAll_doctor = async (req: Request, res: Response): Promise<Response> => {
  try {
    //let Doctors = await prisma.doctor.findMany({include: {schedule: true}} );
    const Doctors = await supabase.from("Doctor").select("*");
    
    return success({ res, data: Doctors });

  } catch (error) {
    return failure({ res, message: error });
  }
};

export const findOne_doctor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const id: number = parseInt(req.params.id);
    const doctor = await supabase.from("Doctor").select("*").eq('id', id);

    if (doctor && doctor.data && doctor.data.length === 0){
      return failure({ res, message: "Doctor not found" });
    }

    return success({ res, message: "Doctor found", data: doctor });

  } catch (error) {
    return failure({ res, message: error });
  }
};

export const modifyDatos_doctor = async (req: Request, res: Response): Promise<Response>  => {
    try {
      const id: number = Number(req.params.id);
      const data = req.body;

      // const data_medico=await prisma.doctor.update({
      //   where: { id },
      //   data: data,
      // });

      const data_medico = await supabase
      .from('Doctor')
      .update({ ...data })
      .eq('id', id)
      .select()

      return success({ res, data: data_medico });

    } catch (error) {
      return failure({ res, message: error });
    }
  };


export const Registration_horario = async (req: Request, res: Response): Promise<Response> => {

  try {
    const data = req.body;

    // const schedule = await prisma.schedule.create({
    //   data
    //     })
      
    const schedule = await supabase.from("Schedule").insert(data).select();

    return success({ res, data: schedule });

  }catch(error) {
      return failure({ res, message: error });
      }
  };


export const create_doctor = async (req: Request, res: Response): Promise<Response>  => {
  try {
    const data = req.body;

    if (!(data.email.includes("@") && data.email.includes(".com")))
      return failure({ res, message: "Incorrect email" });
    if (!data.email || !data.password) {
      return failure({ res, message: "Username and password are required." });
    }
    
    data.password = hash_password(data.password);
    // const medico= await prisma.doctor.create({
    //   data: data,
    // });
    console.log("llegó");
    const medico = await supabase.from("Doctor").insert( data ).select();

    return success({ res, data: medico });
  } catch (error) {
    return failure({ res, message: error });
    }
};




export const delete_doctor = async (req: Request, res: Response): Promise<Response>  => {
  try {
    const id: number = parseInt(req.params.id);

    // const doctor = await prisma.doctor.delete({
    //   where: {
    //     id,
    //   },
    // });

    const doctor= await supabase
    .from('Doctor')
    .delete()
    .eq('id', id)


    // if (doctor.status=204){
    //    return failure({ res, message: "Doctor to delete not found" });
    //  }

    return success({ res, message: "Doctor deleted", data: doctor });
  } catch (error) {
    return failure({ res, message: error });
    }
};


export const findAll_schedule = async (req: Request, res: Response): Promise<Response> => {
  try {
    //let Doctors = await prisma.schedule.findMany();
    const Schedule = await supabase.from("Schedule").select("*");

    return success({ res, data: Schedule });

  } catch (error) {
    return failure({ res, message: error });
  }
};


export const findOne_schedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const id: number = parseInt(req.params.id);
    const schedule = await supabase.from("Schedule").select("*").eq('id', id);

    if (schedule && schedule.data && schedule.data.length === 0){
      return failure({ res, message: "Schedule not found" });
    }

    return success({ res, message: "Schedule found", data: schedule });

  } catch (error) {
    return failure({ res, message: error });
  }
};


export const login_Doctor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const data: PostgrestResponse<User_doctor> = await supabase
      .from("Doctor")
      .select("id, firstname, lastname, specialty, email, password")
      .match({ email });
    console.log(data);
    if (data.data) {
      compare_password(data.data[0].password, password);
      const datetime = new Date().toISOString();
      const last_session = await supabase
        .from("Doctor")
        .update({ last_session: datetime })
        .match({ email });
      const token: string = generate_token(Number(data.data[0].id));
      return success({
        res,
        message: `Welcome!`,
        data: data.data,
        token,
      });
    }
    return failure({ res, message: "Data does not exist or is incorrect" });
  } catch (error) {
    return failure({ res, message: error });
  }
};
