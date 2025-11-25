import CreateReaderDto from "../dtos/create.reader.dto";
import Reader, { IReader } from "../models/reader.model";

class ReaderRepository {
    async existsReader(email: string): Promise<IReader|null> {
        return await Reader.findOne({ email })
    }

    async getReaderById(id: string): Promise<IReader | null> {
        return await Reader.findById(id);
    }
    
    async create(data: CreateReaderDto) {
        return await Reader.create(data);
    }
}

export default new ReaderRepository();