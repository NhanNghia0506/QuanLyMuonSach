import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import staffRepository from "../repositories/staff.repository";
import AppError from "../utils/app.error";

export interface MyJwtPayload extends JwtPayload {
    id: string;
    email: string
}

const StaffMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];
        if(!token) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập"})
        }
        
        const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
        const staff = await staffRepository.findStaffById(decoded.id);
        if(staff)
            req.staff = staff;
        next();
    }catch(error: any) {
        next(new AppError(error.message, 403));
    }
}

export default StaffMiddleware;