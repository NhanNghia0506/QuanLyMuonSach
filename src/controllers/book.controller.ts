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

    async delete(req: Request<{ id: string}, {}, {}>, res: Response){
        try {
            const success = await bookService.delete(req.params.id);
            if(success){
                res.status(200).json({ message: "Book deleted successfully" });
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error: any) {
            res.status(201).json({ message: error.message });
        }
    }
}

export default new BookController();