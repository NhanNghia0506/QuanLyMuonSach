import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';
class CreateBookDto{
    @IsNotEmpty({ message: 'Tên của sách không để dể trống' })
    @IsString({ message: 'Tên sách phải là chuỗi' })
    name!: string;

    @IsNotEmpty({ message: 'Ảnh của sách là bắt buộc' })
    imageUrl!: string;

    @IsNotEmpty({ message: 'Giá của sách không để dể trống' })
    // @IsNumber({}, { message: 'Giá của sách phải là số' })
    price!: number;

    @IsNotEmpty({ message: 'Số lượng của sách không để dể trống' })
    // @IsNumber({},{ message: 'Số lượng của sách phải là số' })
    quantity!: number;

    @IsNotEmpty({ message: 'Ngày xuất bản không để dể trống' })
    @IsDateString({}, { message: 'Ngày xuất bản phải là định dạng ngày tháng' })
    publishAt!: Date;

    @IsNotEmpty({ message: 'Nhà xuất bản của sách là bắt buộc' })
    publisherId!: string;

}

export default CreateBookDto;