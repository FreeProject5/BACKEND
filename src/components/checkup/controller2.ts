import { Request, Response } from "express";
import supabase from "../../services/supabase";
import { success, failure } from "../../responses";

export const add_doctor = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const data = await supabase.from("Doctor").insert(body).select();
        return success({
            res,
            message: "Doctor added succesfully",
            data: data
        });
    } catch (error) {
        return failure({
            res,
            message: error
        });
    }
};