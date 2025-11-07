import CreateBookDto from "../dtos/create.book.dto";
import bookRepository from "../repositories/book.repository";
import fileService from "./file.service";

class BookService {
    async create(data: CreateBookDto){
        return await bookRepository.create(data);
    }

    async delete(id: string){
        // thực hiện xóa ảnh khỏi thư mục uploads
        const book = await bookRepository.findById(id);
        if(book) {
           await fileService.deleteByUrl(book.imageUrl);
           return await bookRepository.delete(id);
        }
        return null;
    }

    async update(id: string, data: CreateBookDto){
        // thực hiện xóa ảnh khỏi thư mục uploads
        const book = await bookRepository.findById(id);
        if(book) {
           await fileService.deleteByUrl(book.imageUrl);
           return await bookRepository.update(id, data);
        }
        return null;
    }
}

export default new BookService();