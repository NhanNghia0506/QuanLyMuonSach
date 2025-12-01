import { NextFunction, Request, Response } from "express";
import publisherService from "../services/publisher.service";
import AppError from "../utils/app.error";

class PublisherController {
    // Tạo nhà xuất bản mới
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const publisher = await publisherService.create(req.body);
            res.status(201).json({ publisher });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    // Xóa nhà xuất bản theo ID
    async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const success = await publisherService.delete(req.params.id);
            if (success) {
                res.status(200).json({ message: "Publisher deleted successfully" });
            } else {
                res.status(404).json({ message: "Publisher not found" });
            }
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    // Cập nhật nhà xuất bản theo ID
    async update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const newPublisher = await publisherService.update(id, req.body);
            if (newPublisher) {
                res.status(200).json({ newPublisher });
            } else {
                res.status(404).json({ message: "Publisher not found" });
            }
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    // Lấy tất cả nhà xuất bản
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const publishers = await publisherService.getAll();
            res.status(200).json({ publishers });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    // Tìm nhà xuất bản theo ID
    async findById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const publisher = await publisherService.findById(req.params.id);
            if (publisher) {
                res.status(200).json({ publisher });
            } else {
                res.status(404).json({ message: "Publisher not found" });
            }
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    // Tìm kiếm nhà xuất bản theo tên
    async searchPublishers(req: Request<{}, {}, {}, { search: string }>, res: Response, next: NextFunction) {
        try {
            const publishers = await publisherService.searchPublishers(req.query.search);
            res.status(200).json({ publishers });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }
}

export default new PublisherController();
