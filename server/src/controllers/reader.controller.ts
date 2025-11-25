import { NextFunction, Request, Response } from "express";
import readerService from "../services/reader.service";
import CreateReaderDto from "../dtos/create.reader.dto";
import ReaderLoginDto from "../dtos/login.reader.dto";
import AppError from "../utils/app.error";

class ReaderController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const readerDto = new CreateReaderDto(req.body);
            const reader = await readerService.create(readerDto);
            return res.status(200).json({
                message: "Tạo tài khoản thành công",
                reader
            })
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try{
            const readerLogin = new ReaderLoginDto(req.body);
            const token = await readerService.login(readerLogin);
            return res.status(200).json({ token });
        }catch(error: any) {
            next(new AppError(error.message, 400));
        }
    }
}

export default new ReaderController();