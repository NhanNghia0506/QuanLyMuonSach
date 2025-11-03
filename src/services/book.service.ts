import CreateBookDto from "../dtos/create.book.dto";
import bookRepository from "../repositories/book.repository";

class BookService {
    async create(data: CreateBookDto){
        return await bookRepository.create(data);
    }

    async delete(id: string){
        return await bookRepository.delete(id);
    }

    async update(id: string, data: CreateBookDto){
        return await bookRepository.update(id, data);
    }
}

export default new BookService();