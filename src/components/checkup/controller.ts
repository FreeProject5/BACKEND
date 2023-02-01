import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const createSpecialty = async (req: Request, res: Response): Promise<void> => {
  try {
      const { name } = req.body;

      await prisma.specialty.create({
          data: {
              name,
          },
      });

      res.status(201).json({ ok: true, message: "Specialty created successfully" });
  } catch (error) {
      res.status(500).json({ ok: false, message: error });
  }
};

