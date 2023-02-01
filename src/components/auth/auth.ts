import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { success, failure } from "../../responses";

dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY;

export const generate_token = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: "2h" });
};

export const verify_token = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
      if (!authorization)
        return failure({ res, status: 401, message: "Unauthorized"});
      if (!authorization.startsWith("Bearer ")) {
        return failure({ res, status: 401, message: "Token format wrong" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) return res.status(401).send("Invalid token.");
        req.headers.token = decoded;
      next();
    });
  } catch (error) {
    return failure({res, message: error})
  }
};

