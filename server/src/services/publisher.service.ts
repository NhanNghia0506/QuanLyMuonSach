import CreatePublisherDto from "../dtos/create.publisher.dto";
import publisherRepository from "../repositories/publisher.repository";

class PublisherService {
    // Tạo nhà xuất bản mới
    async create(data: CreatePublisherDto) {
        return await publisherRepository.create(data);
    }

    // Xóa nhà xuất bản theo ID
    async delete(id: string) {
        const publisher = await publisherRepository.findById(id);
        if (publisher) {
            return await publisherRepository.delete(id);
        }
        return null;
    }

    // Cập nhật nhà xuất bản theo ID
    async update(id: string, data: CreatePublisherDto) {
        const publisher = await publisherRepository.findById(id);
        if (publisher) {
            return await publisherRepository.update(id, data);
        }
        return null;
    }

    // Lấy tất cả nhà xuất bản
    async getAll() {
        return await publisherRepository.findAll();
    }

    // Tìm nhà xuất bản theo tên (search)
    async searchPublishers(query: string) {
        const publishers = await publisherRepository.findByName(query);
        return publishers;
    }

    // Tìm nhà xuất bản theo ID
    async findById(id: string) {
        return await publisherRepository.findById(id);
    }
}

export default new PublisherService();
