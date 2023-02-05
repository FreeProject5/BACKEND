import { Request, Response } from "express";
import supabase from "../../services/supabase";
import { success, failure } from "../../responses";


export const add_checkup = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const addcheckup = await supabase.from("Checkup").insert(data).select();
        return success({
            res,
            message: "Checkup added succesfully",
            data: addcheckup.data

        });
    } catch (error) {
        console.log(error)
        return failure({
            res,
            message: error,
        });
    }
};

export const get_checkup = async (req: Request, res: Response) => {
    try {
        const getcheckup = await supabase.from("Checkup").select("*");
        return success({
            res,
            message: "All checkups",
            data: getcheckup.data
        });
    } catch (error) {
        return failure({
            res,
            message: error,
        });
    }
};

export const delete_checkup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletecheckup = await supabase.from("Checkup").delete().match({"id": id});
        return success({
            res,
            message: "Checkup deleted succesfully",
            data: deletecheckup.data
        });
    } catch (error) {
        return failure({
            res,
            message: error,
            
        });
    }
};

export const update_checkup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const checkup = req.body;
        const updatecheckup = await supabase.from("Checkup").update({...checkup}).eq("id", id).select();
        return success({
            res,
            message: "Checkup updated succesfully",
            data: updatecheckup.data
        });
    } catch (error) {
        return failure({
            res,
            message: error,
        });
    }
};

export const getCheckup_byPatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getcheckupbypatient = await supabase.from("Checkup").select(
            "id_patient, Patient(firstname, lastname), id_specialtie, Specialties(name),id_doctor,Doctor(firstname, lastname), checkup_date, checkup_time"
            ).in("id_patient",[id]);  
        return success({
            res,
            message: "Checkup by Patient",
            data: getcheckupbypatient.data
        });
    } catch (error) {
        console.log(error)
        return failure({
            res,
            message: error,
        });
    }
};














