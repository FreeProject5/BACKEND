import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";