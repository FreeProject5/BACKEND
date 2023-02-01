import type { Response } from "express";

interface IResponse {
  res: Response;
  status?: number;
  data?: any;
  message?: any;
  token?: string;
}

export function success({
  res,
  status = 200,
  message,
  data,
  token,
}: IResponse): Response {
  return res.status(status).json({
    ok: true,
    message,
    data,
    token,
  });
}

export function failure({ res, status = 500, message }: IResponse): Response {
  return res.status(status).json({
    ok: false,
    message,
  });
}
