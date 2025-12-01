import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

class UpdatePublisherDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Tên nhà xuất bản không được để trống' })
  @IsString({ message: 'Tên nhà xuất bản phải là chuỗi' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Địa chỉ nhà xuất bản không được để trống' })
  @IsString({ message: 'Địa chỉ nhà xuất bản phải là chuỗi' })
  address?: string;
}

export default UpdatePublisherDto;
