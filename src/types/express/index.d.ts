import { IUser } from "../../modules/user/models";

declare global {
    namespace Express {
        interface Request {
            user?: IUser | null;
        }
    }
}

export {}