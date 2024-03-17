import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static errorHandle(
    err: any,
    _request: Request,
    response: Response,
    _: NextFunction
  ) {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        code: err.statusCode,
        message: err.message
      });
    }

    return response.status(500).json({
      status: 'error',
      code: 500,
      message: err.message
    });
  }
}
