import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const modify_datos = async (req: Request, res: Response): Promise<Response>  => {
    try {
      const id: number = Number(req.params.id);
      const data = req.body;

      const data_medico=await prisma.medico.update({
        where: { id },
        data: data,
      });
  
      return success({ res, data: data_medico });

    } catch (error) {
        return failure({ res, message: error });
    }
  };