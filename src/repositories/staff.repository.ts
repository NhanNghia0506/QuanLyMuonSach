import CreateStaffDto from "../dtos/create.staff.dto";
import Staff from "../models/staff.model";

class StaffRepository {
    async findStaffById(id: string) {
        return await Staff.findById(id);
    }

    async create(data: CreateStaffDto) {
        return await Staff.create(data);
    }
}

export default new StaffRepository();