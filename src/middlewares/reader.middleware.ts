import { Request, Response } from "express";
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import readerRepository from "../repositories/reader.repository";

export interface MyJwtPayload extends JwtPayload {
    id: string;
    email: string
}

const ReaderMiddleWare = async ( req: Request, res: Response, next: Function ) => {
    try {   
        const token = req.headers['authorization']?.split(" ")[1];
        if(!token) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập"})
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
        const reader = await readerRepository.getReaderById(decoded.id);
        if(reader)
            req.reader = reader;
        next();
    }catch(error: any) {
        return res.status(403).json({ message: "Token không hợp lệ" });
    }
}

export default ReaderMiddleWare;