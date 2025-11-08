import CreateStaffDto from "../dtos/create.staff.dto";
import staffRepository from "../repositories/staff.repository";
import AppError from "../utils/app.error";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
class StaffService {
    async create(data: CreateStaffDto) {
        if(await staffRepository.existsStaff(data.email)) {
            throw new AppError("Email đã được sử dụng", 400);
        }

        // hash password
        const hasedPassword = await bcrypt.hash(data.password, 10);

        return staffRepository.create({...data, password: hasedPassword});
    }

    async login(data: CreateStaffDto) {
        const staff = await staffRepository.existsStaff(data.email);
        if(!staff) {
            throw new AppError('Email này không tồn tại trong hệ thống', 400);
        }

        // kiểm tra password
        const isMatch = await bcrypt.compare(data.password, staff.password);
        if(!isMatch) {
            throw new AppError('Sai email hoặc mật khẩu, vui lòng nhập lại', 400);
        }

        // Tạo token
        const token = jwt.sign(
            { id: staff._id, email: staff.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        return token;
    }
}

export default new StaffService();