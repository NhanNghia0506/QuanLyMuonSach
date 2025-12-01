import type { AxiosInstance } from "axios";
import createApiClient from "./api.service";

class PublisherService {
    private api: AxiosInstance;

    constructor(baseUrl: string = "/api/publisher") {
        this.api = createApiClient(baseUrl);
    }

    // Lấy tất cả nhà xuất bản
    async getAll() {
        return await this.api.get('/all');
    }

    // Lấy nhà xuất bản theo id
    async getById(id: string) {
        return await this.api.get(`/${id}`);
    }

    // Tạo nhà xuất bản mới
    async create(publisherData: any) {
        return await this.api.post('/create', publisherData);
    }

    // Cập nhật nhà xuất bản
    async update(id: string, publisherData: any) {
        return await this.api.put(`/update/${id}`, publisherData);
    }

    // Xóa nhà xuất bản
    async delete(id: string) {
        return await this.api.delete(`/delete/${id}`);
    }

    // Tìm kiếm nhà xuất bản theo tên
    async search(query: string) {
        return await this.api.get('/', { params: { search: query } });
    }
}

export default new PublisherService();
