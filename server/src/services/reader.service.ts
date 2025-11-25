import CreateReaderDto from "../dtos/create.reader.dto";
import ReaderLoginDto from "../dtos/login.reader.dto";
import { IReader } from "../models/reader.model";
import readerRepository from "../repositories/reader.repository";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
class ReaderService {
    private isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async create(data: CreateReaderDto): Promise<IReader> {
        if(!this.isValidEmail(data.email)) {
            throw new Error('Email không hợp lệ');
        }

        if(await readerRepository.existsReader(data.email)) {
            throw new Error("Email đã được sử dụng");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const createReaderDto = new CreateReaderDto({
            ...data,
            password: hashedPassword
        });

        return await readerRepository.create(createReaderDto);
    }

    async login(data: ReaderLoginDto): Promise<string> {
        if(!this.isValidEmail(data.email)) {
            throw new Error('Email không hợp lệ');
        }

        const reader = await readerRepository.existsReader(data.email);
        if(!reader) {
            throw new Error('Email này không tồn tại trong hệ thống')
        }

        // kiểm tra password
        const isMatch = await bcrypt.compare(data.password, reader.password);
        if(!isMatch) {
            throw new Error('Sai email hoặc mật khẩu, vui lòng nhập lại')
        }

        // Tạo token
        const token = jwt.sign(
            { id: reader._id, email: reader.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        return token;
    }
}

export default new ReaderService();