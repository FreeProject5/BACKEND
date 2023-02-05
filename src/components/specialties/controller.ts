import { Request, Response } from "express";
import { supabase } from "../../services/supabase";
import { success, failure } from "../../responses";

export const add_specialties = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const addspecialties = await supabase
      .from("Specialties")
      .insert(body)
      .select();
    return success({
      res,
      message: "Specialty added succesfully",
      data: addspecialties.data,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const get_specialties = async (req: Request, res: Response) => {
  try {
    const getspecialties = await supabase.from("Specialties").select("*");
    return success({
      res,
      message: "All specialties",
      data: getspecialties.data,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const delete_specialties = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletespecialties = await supabase
      .from("Specialties")
      .delete()
      .match({ id: id });
    return success({
      res,
      message: "Specialty deleted succesfully",
      data: deletespecialties.data,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const update_specialty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const specialty = req.body;
        const updateSpecialty = await supabase.from("Specialties").update({...specialty}).eq("id", id).select();
        return success({
            res,
            message: "Specialty updated succesfully",
            data: updateSpecialty.data
        });
    } catch (error) {
        return failure({
            res,
            message: error,
        });
    }
};

export const getDoctorsBySpecialty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doctorsbyspeciality = await supabase.from("Doctor").select("firstname, lastname").in("specialty",[id]);  
        return success({
            res,
            message: "Doctors by specialty",
            data: doctorsbyspeciality.data
        });
    } catch (error) {
        console.log(error)
        return failure({
            res,
            message: error,
        });
    }
};
