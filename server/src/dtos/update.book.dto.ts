import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
class UpdateBookDto{
    @IsOptional()
    @IsString({ message: 'Tên sách phải là chuỗi' })
    name?: string;

    @IsOptional()
    imageUrl?: string;

    @IsOptional()
    // @IsNumber({}, { message: 'Giá của sách phải là số' })
    price?: number;

    @IsOptional()
    // @IsNumber({},{ message: 'Số lượng của sách phải là số' })
    quantity?: number;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày xuất bản phải là định dạng ngày tháng' })
    publishAt?: Date;

    @IsOptional()
    @IsString({ message: 'ID nhà xuất bản phải là chuỗi' })
    publisherId?: string;
}

export default UpdateBookDto;