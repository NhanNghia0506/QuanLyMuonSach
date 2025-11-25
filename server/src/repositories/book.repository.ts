import CreateBookDto from "../dtos/create.book.dto";
import UpdateBookDto from "../dtos/update.book.dto";
import Book from "../models/book.model";

class BookRepository {
    // Tìm kiếm book theo id
    async findById(id: string) {
        return await Book.findById(id);
    }

    // Tìm kiếm book theo tên
    async findByName(name: string) {
        return await Book.find({ name: { $regex: name, $options: 'i' } });
    }

    async create(data:CreateBookDto) {
        return await Book.create(data);
    }

    async delete(id: string) {
        return await Book.findByIdAndDelete(id);
    }

    async update(id: string, data: UpdateBookDto) {
        return await Book.findByIdAndUpdate(id, data, { new: true })
    }
}

export default new BookRepository();