import CreateBookDto from "../dtos/create.book.dto";
import Book from "../models/book.model";

class BookRepository {
    async create(data:CreateBookDto) {
        return await Book.create(data);
    }
}

export default new BookRepository();