import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";
import {supabase} from "../../services/supabase";

export const findAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    //let Doctors = await prisma.doctor.findMany({include: {schedule: true}} );
    const Doctors = await supabase.from("Doctor").select("*");
    return success({ res, data: Doctors });

  } catch (error) {
    return failure({ res, message: error });
  }
};



export const modify_datos = async (req: Request, res: Response): Promise<Response>  => {
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

    // const medico= await prisma.doctor.create({
    //   data: data,
    // });

    const medico = await supabase.from("Doctor").insert(data).select();

    return success({ res, data: medico });
  } catch (error) {
    return failure({ res, message: error });
    }
};


export const deletee = async (req: Request, res: Response): Promise<Response>  => {
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

    return success({ res, data: doctor });
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

    return success({ res, message: "Schedule found", data: schedule });

  } catch (error) {
    return failure({ res, message: error });
  }
};