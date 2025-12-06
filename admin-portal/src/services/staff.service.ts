import type { AxiosInstance } from "axios";
import createApiClient from "./api.service";

class StaffService {
    private api: AxiosInstance;

    constructor(baseUrl: string = "/api/staff") {
        this.api = createApiClient(baseUrl);
    }

    // Đăng ký nhân viên
    async register(data: any) {
        return await this.api.post('/register', data);
    }

    // Đăng nhập nhân viên
    async login(data: any) {
        return await this.api.post('/login', data);
    }

    // Lấy danh sách nhân viên
    async allStaffs() {
        return await this.api.get('/all');
    }
}

export default new StaffService();
