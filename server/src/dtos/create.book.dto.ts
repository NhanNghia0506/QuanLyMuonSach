import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';
class CreateBookDto{
    @IsString({ message: 'Tên sách phải là chuỗi' })
    name!: string;

    @IsString({ message: 'Ảnh của sách là bắt buộc' })
    imageUrl!: string;

    // @IsNumber({}, { message: 'Giá của sách phải là số' })
    price!: number;

    // @IsNumber({},{ message: 'Số lượng của sách phải là số' })
    quantity!: number;

    @IsDateString({}, { message: 'Ngày xuất bản phải là định dạng ngày tháng' })
    publishAt!: Date;

    publisherId!: string;

}

export default CreateBookDto;