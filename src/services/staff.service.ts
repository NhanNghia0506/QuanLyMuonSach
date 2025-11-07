import CreateStaffDto from "../dtos/create.staff.dto";
import staffRepository from "../repositories/staff.repository";

class StaffService {
    async create(data: CreateStaffDto) {
        return staffRepository.create(data);
    }
}

export default new StaffService();