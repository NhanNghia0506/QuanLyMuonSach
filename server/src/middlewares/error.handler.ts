import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app.error";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
    });
}

export default errorHandler;