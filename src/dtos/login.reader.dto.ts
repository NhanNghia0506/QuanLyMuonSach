export interface IReaderLogin {
    email: string;
    password: string;
}

export class ReaderLoginDto implements IReaderLogin {
    email: string;
    password: string;
    
    constructor({ email, password }: IReaderLogin) {
        this.email = email,
        this.password = password
    }
}

export default ReaderLoginDto;