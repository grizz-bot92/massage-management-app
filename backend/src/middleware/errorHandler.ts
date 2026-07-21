import express, {Request, Response, NextFunction} from 'express';


export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  res.status(500).json({
    cause: err.name,
    message: err.message
  });
}