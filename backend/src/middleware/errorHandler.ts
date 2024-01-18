import { NextFunction, Request, Response } from "express";
import {ApiError} from '../helpers/api_erros'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${error.message}`);
  return res.status(500).json({ message: "Internal server error" });
};
