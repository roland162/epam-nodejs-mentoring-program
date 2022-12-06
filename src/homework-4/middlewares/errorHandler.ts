import { Request, Response } from "express";

interface ExtenderError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ExtenderError,
  req: Request,
  res: Response,
  next
) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message;
  res.status(errStatus).json({
    status: errStatus,
	method: req.method,
	arguments: {
		...req.params,
		...req.query,
		...req.body,
	},
    message: errMsg,
    error: err.stack,
  });
};
