import { Request, Response } from "express";
import bookService from "../services/book.service";

class BookController {
    async create(req: Request, res: Response) {
        try {
            const book = await bookService.create({...req.body, imageUrl: req.file?.filename });
            res.status(201).json({ book });
        } catch (error: any) {
            res.status(201).json({ message: error.message });
        }
    }
}

export default new BookController();