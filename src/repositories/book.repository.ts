import CreateBookDto from "../dtos/create.book.dto";
import Book from "../models/book.model";

class BookRepository {
    async create(data:CreateBookDto) {
        return await Book.create(data);
    }

    async delete(id: string) {
        return await Book.findByIdAndDelete(id);
    }
}

export default new BookRepository();