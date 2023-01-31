import { Request, response, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";
import { hash_password, compare_password } from "../../utils/strings";

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
    const user = await prisma.user.create({ data: body });
    return success({
      res,
      status: 201,
      message: "User create successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return failure({ res, message: error });
  }
};

export const get_patient = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    return success({ res, data: user });
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

export const delete_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.delete({ where: { id } });
    return success({ res, message: "User deleted succesfully" });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const login_patient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!compare_password(user?.password as string, password)) {
      return failure({ res, message: "Data does not exist or is incorrect" });
    }
    return success({ res, message: "Welcome!", data: user });
  } catch (error) {
    console.log(error);
    return failure({ res, message: error });
  }
};
