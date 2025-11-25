import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app.error";
import staffService from "../services/staff.service";

class StaffController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            if(req.staff?.role !== 'admin') {
                return next(new AppError('Chỉ quản trị viên mới có quyền tạo tài khoản nhân viên', 403));
            }
            const staff = await staffService.create(req.body);
            if(staff) {
                return res.status(200).json({
                    message: "Tạo tài khoản nhân viên thành công",
                })
            }

            return next(new AppError("Tạo tài khoản nhân viên thất bại", 400))
            
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