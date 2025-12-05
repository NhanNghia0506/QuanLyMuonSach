import type { AxiosInstance } from "axios";
import createApiClient from "./api.service";
class BookService {
    private api: AxiosInstance
    constructor(baseUrl: string = "/api/book") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return await this.api.get('/all');
    }

    async getById(id: string) {
        return await this.api.get(`/${id}`);
    }

    async create(bookData: any)  {
        return await this.api.post('/create', bookData);
    }

    async update(id: string, bookData: any) {
        return await this.api.put(`/update/${id}`, bookData);
    }
}

export default new BookService()