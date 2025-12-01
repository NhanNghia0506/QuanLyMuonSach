import { IsNotEmpty, IsString } from 'class-validator';

class CreatePublisherDto {
  @IsNotEmpty({ message: 'Tên nhà xuất bản không được để trống' })
  @IsString({ message: 'Tên nhà xuất bản phải là chuỗi' })
  name!: string;

  @IsNotEmpty({ message: 'Địa chỉ nhà xuất bản không được để trống' })
  @IsString({ message: 'Địa chỉ nhà xuất bản phải là chuỗi' })
  address!: string;
}

export default CreatePublisherDto;
