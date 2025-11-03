export class ReaderLoginDto {
    email: string;
    password: string;
    
    constructor({ email, password }: any) {
        this.email = email,
        this.password = password
    }
}

export default ReaderLoginDto;