import { Request, Response } from "express";
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import UserRepository from "../modules/user/repositories";
export interface MyJwtPayload extends JwtPayload {
    id: string;
    email: string
}

const AuthMiddleWare = async ( req: Request, res: Response, next: Function ) => {
    try {   
        const token = req.headers['authorization']?.split(" ")[1];
        if(!token) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập"})
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
        const user = await new UserRepository().getUserById(decoded.id);
        if(user)
            req.user = user;
        next();
    }catch(error: any) {
        return res.status(403).json({ message: "Token không hợp lệ" });
    }
}

export default AuthMiddleWare;