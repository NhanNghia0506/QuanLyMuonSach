import { NextFunction, Request, Response } from "express";
import bookService from "../services/book.service";
import AppError from "../utils/app.error";

class BookController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await bookService.create({...req.body, imageUrl: req.file?.filename });
            res.status(201).json({ book });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    async delete(req: Request<{ id: string}, {}, {}>, res: Response, next: NextFunction){
        try {
            const success = await bookService.delete(req.params.id);
            if(success){
                res.status(200).json({ message: "Book deleted successfully" });
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    async update(req: Request<{ id: string }, {}>, res: Response, next: NextFunction){ 
        try {
            const id = req.params.id;
            const newBook = await bookService.update(id, {...req.body, imageUrl: req.file?.filename });
            if(newBook) {
                res.status(200).json({ newBook });
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    async searchBooks(req: Request<{}, {}, {}, { search: string }>, res: Response, next: NextFunction) {
        try {
            const books = await bookService.searchBooks(req.query.search);
            res.status(200).json({ books });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }
}

export default new BookController();