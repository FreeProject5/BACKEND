import type { Response } from "express";

interface IResponse {
  res: Response;
  status?: number;
  data?: any;
  message?: any;
}

export function success({ res, status = 200, message, data }: IResponse): Response {
  return res.status(status).json({
      ok: true,
      message,
    data,
  });
}

export function failure({ res, status = 500, message }: IResponse): Response {
  return res.status(status).json({
    ok: false,
    message,
  });
}
