import type { AxiosInstance } from "axios";
import createApiClient from "./api.service";
class ReaderService {
    private api: AxiosInstance
    constructor(baseUrl: string = "/api/reader") {
        this.api = createApiClient(baseUrl);
    }

    async register(data: any) {
        return await this.api.post('/register', data);
    }
}

export default new ReaderService()