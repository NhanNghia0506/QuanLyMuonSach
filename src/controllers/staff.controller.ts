import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app.error";
import staffService from "../services/staff.service";

class StaffController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const staff = await staffService.create(req.body);
            return res.status(200).json({
                message: "Tạo tài khoản nhân viên thành công",
                staff
            })
        } catch (error: any) {
            next(new AppError(error.message, 400))
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await staffService.login(req.body);
            return res.status(200).json({
                message: "Đăng nhập thành công",
                token
            })
        } catch (error: any) {
            next(new AppError(error.message, 400))
        }
    }
}

export default new StaffController();