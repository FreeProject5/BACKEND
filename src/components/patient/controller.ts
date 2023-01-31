import { Request, response, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";
import { hash_password, compare_password } from "../../utils/strings";

export const create_user = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;
    body.password = hash_password(body.password);
    body.last_session = new Date(body.last_session);
    body.date_born = new Date(body.date_born);
    const user = await prisma.user.create(body);
    return success({
      res,
      status: 201,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const get_ser = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await prisma.user.findMany();
    return success({ res, data: user });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const update_user = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const { data } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return success({ res, message: "User updated successfully", data: user });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const delete_user = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.delete({ where: { id } });
    return success({ res, message: "User deleted" });
  } catch (error) {
    return failure({ res, message: error });
  }
};


