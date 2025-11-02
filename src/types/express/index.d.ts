import { IReader } from "../../models/reader.model";

declare global {
    namespace Express {
        interface Request {
            reader?: IReader | null;
        }
    }
}

export {}