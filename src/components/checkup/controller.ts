import { Request, Response } from "express";
import supabase from "../../services/supabase";
import { success, failure } from "../../responses";

export const add_checkup = async (req: Request, res: Response) => {
    try{
        const { body } = req;
        const addcheckup = await supabase.from("Checkup").insert(body).select();
        return success({
            res,
            message: "Checkup added succesfully",
            data: addcheckup.data
        });
    }catch(error){
        return failure({
            res,
            message: error,
        });
    }
};

// export const add_checkup = async (req: Request, res: Response) => {
//     try {
//         const { body } = req;
//         const checkupData = {
//             id_patient: body.id_patient,
//             id_specialtie: body.id_specialtie,
//             id_doctor: body.id_doctor,
//             id_schedule: body.id_schedule,
//         };
//         const checkupWithDates = {
//             ...checkupData,
//             checkup_date: body.checkup_date,
//             checkup_time: body.checkup_time,
//             created_at: new Date(),
//         };
//         const addcheckup = await supabase
//             .from("Checkup")
//             .insert(checkupWithDates, { upsert: true })
//             .select();
//         return success({
//             res,
//             message: "Checkup added succesfully",
//             data: addcheckup.data,
//         });
//     } catch (error) {
//         return failure({
//             res,
//             message: error,
//         });
//     }
// };