export class CreateReaderDto{
    name: string;
    email: string;
    password: string;
    gender?: "Nam" | "Nữ";
    dateOfBirth?: Date | undefined;
    address: string;
    phoneNumber: string;

    constructor({ name, email, password, gender, dateOfBirth, address, phoneNumber }: any) {
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