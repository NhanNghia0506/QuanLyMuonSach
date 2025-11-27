import { IsNotEmpty, IsDateString, IsEnum, IsOptional  } from 'class-validator';

export enum LoanStatus {
 PENDING = 'Chờ được duyệt',
  APPROVED = 'Được duyệt',
  BORROWED = 'Đang mượn',
  RETURNED = 'Đã trả',
  DAMAGED = 'Hư hỏng',
  OVERDUE = 'Trễ hạn',
  LOST = 'Mất sách',
}

export class CreateLoanTransactionDto {
    @IsNotEmpty({ message: 'Độc giả không được để trống' })
    readerId!: string;

    @IsNotEmpty({ message: 'Sách không được để trống' })
    bookId!: string;

    // Khi user đăng ký online thì chưa có nhân viên
    @IsOptional()
    staffId?: string;

    // Khi đăng ký mượn thì chưa mượn → optional
    @IsOptional()
    @IsDateString({}, { message: 'Ngày mượn phải đúng định dạng ngày tháng' })
    borrowedAt?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày hạn trả phải đúng định dạng ngày tháng' })
    dueAt?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày trả phải đúng định dạng ngày tháng' })
    returnedAt?: Date;

    @IsEnum(LoanStatus, { message: 'Trạng thái không hợp lệ!' })
    status!: LoanStatus;

    // Chưa duyệt → optional
    @IsOptional()
    @IsDateString({}, { message: 'Ngày được duyệt phải đúng định dạng ngày tháng' })
    approvedAt?: Date;
}


export default CreateLoanTransactionDto;