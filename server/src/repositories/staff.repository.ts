import CreateStaffDto from "../dtos/create.staff.dto";
import Staff from "../models/staff.model";

class StaffRepository {

    // Tìm nhân viên theo ID
    async findStaffById(id: string) {
        return await Staff.findById(id);
    }

    // Kiểm tra tồn tại nhân viên theo email
    async existsStaff(email: string) {
        return await Staff.findOne({ email });
    }

    // Tạo mới nhân viên
    async create(data: CreateStaffDto) {
        return await Staff.create(data);
    }

    async getAll() {
        return await Staff.find();
    }
}

export default new StaffRepository();