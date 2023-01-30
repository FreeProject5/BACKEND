import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const getUser =async (_req:Request, res: Response):Promise<Response> => {
    try {
        const user = await prisma.user.findMany()
    return success({res, data: user})
    } catch (error) {
        return failure({res, message:error})
    }
}






