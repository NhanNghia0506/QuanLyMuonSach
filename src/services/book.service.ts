import CreateBookDto from "../dtos/create.book.dto";
import bookRepository from "../repositories/book.repository";

class BookService {
    async create(data: CreateBookDto){
        return await bookRepository.create(data);
    }
}

export default new BookService();