import { Request, Response, NextFunction } from "express";
import { HTTPStatusCodes } from "../../config/http.config";

interface ErrorWithStatus extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // You can replace with logger like Winston in production

  const statusCode = err.statusCode || HTTPStatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
