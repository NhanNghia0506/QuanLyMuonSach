import CreateBookDto from "../dtos/create.book.dto";
import bookRepository from "../repositories/book.repository";

class BookService {
    async create(data: CreateBookDto){
        return await bookRepository.create(data);
    }

    async delete(id: string){
        return await bookRepository.delete(id);
    }
}

export default new BookService();