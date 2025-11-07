import { IsNotEmpty, IsString } from "class-validator";

class CreateStaffDto {
    @IsNotEmpty({ message: 'Tên nhân viên không để dể trống' })
    @IsString({ message: 'Tên nhân viên phải là chuỗi' })
    name!: string;
    @IsNotEmpty({ message: 'Email nhân viên không để dể trống' })
    @IsString({ message: 'Email nhân viên phải là chuỗi' })
    email!: string;
    @IsNotEmpty({ message: 'Mật khẩu nhân viên không để dể trống' })
    password!: string;
    @IsNotEmpty({ message: 'Vai trò nhân viên không để dể trống' })
    role!: string;
    @IsNotEmpty({ message: 'Địa chỉ nhân viên không để dể trống' })
    address!: string
    @IsNotEmpty({ message: 'Số điện thoại nhân viên không để dể trống' })
    phoneNumber!: string;
}

export default CreateStaffDto;