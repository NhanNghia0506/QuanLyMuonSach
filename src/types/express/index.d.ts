import { IReader } from "../../models/reader.model";
import { IStaff } from "../../models/staff.model";

declare global {
    namespace Express {
        interface Request {
            reader?: IReader | null;
            staff?: IStaff | null;
        }
    }
}

export {}