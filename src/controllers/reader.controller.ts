import { Request, Response } from "express";
import readerService from "../services/reader.service";
import CreateReaderDto from "../dtos/create.reader.dto";
import ReaderLoginDto from "../dtos/login.reader.dto";

class ReaderController {
    async create(req: Request, res: Response) {
        try {
            const readerDto = new CreateReaderDto(req.body);
            const reader = await readerService.create(readerDto);
            return res.status(200).json({
                message: "Tạo tài khoản thành công",
                reader
            })
        } catch (error) {
            return res.json(error)
        }
    }

    async login(req: Request, res: Response) {
        try{
            const readerLogin = new ReaderLoginDto(req.body);
            const token = await readerService.login(readerLogin);
            return res.status(200).json({ token });
        }catch(error: any) {
            return res.status(400).json({message: error.message })
        }
    }
}

export default new ReaderController();