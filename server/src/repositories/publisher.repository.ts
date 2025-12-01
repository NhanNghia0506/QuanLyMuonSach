import CreatePublisherDto from "../dtos/create.publisher.dto";
import UpdatePublisherDto from "../dtos/update.publisher.dto";
import Publisher from "../models/publisher.model";

class PublisherRepository {
    // Tìm kiếm publisher theo ID
    async findById(id: string) {
        return await Publisher.findById(id);
    }

    // Tìm kiếm publisher theo tên (search)
    async findByName(name: string) {
        return await Publisher.find({ name: { $regex: name, $options: "i" } });
    }

    // Tạo nhà xuất bản mới
    async create(data: CreatePublisherDto) {
        return await Publisher.create(data);
    }

    // Xóa nhà xuất bản theo ID
    async delete(id: string) {
        return await Publisher.findByIdAndDelete(id);
    }

    // Cập nhật nhà xuất bản theo ID
    async update(id: string, data: UpdatePublisherDto) {
        return await Publisher.findByIdAndUpdate(id, data, { new: true });
    }

    // Lấy tất cả nhà xuất bản
    async findAll() {
        return await Publisher.find();
    }
}

export default new PublisherRepository();
