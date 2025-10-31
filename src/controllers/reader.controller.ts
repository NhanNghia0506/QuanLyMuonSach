import { Request, Response } from "express";
import readerService from "../services/reader.service";
import CreateReaderDto from "../dtos/create.reader.dto";

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
}

export default new ReaderController();