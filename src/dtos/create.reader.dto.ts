export interface ICreateReaderDto {
    name: string,
    email: string,
    password: string,
    gender?: 'Nam' | 'Nữ',
    dateOfBirth?: Date | undefined,
    address: string,
    phoneNumber: string,
}
export class CreateReaderDto implements ICreateReaderDto{
    name: string;
    email: string;
    password: string;
    gender?: "Nam" | "Nữ";
    dateOfBirth?: Date | undefined;
    address: string;
    phoneNumber: string;

    constructor({ name, email, password, gender, dateOfBirth, address, phoneNumber }: ICreateReaderDto) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.gender = gender ?? 'Nam',
        this.dateOfBirth = dateOfBirth ?? undefined,
        this.address = address,
        this.phoneNumber = phoneNumber
    }
}

export default CreateReaderDto;