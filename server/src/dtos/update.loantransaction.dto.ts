import { IsDateString, IsEnum, IsOptional  } from 'class-validator';
export enum LoanStatus {
 PENDING = 'Chờ được duyệt',
  APPROVED = 'Được duyệt',
  BORROWED = 'Đang mượn',
  RETURNED = 'Đã trả',
  DAMAGED = 'Hư hỏng',
  OVERDUE = 'Trễ hạn',
  LOST = 'Mất sách',
}

class UpdateLoanTransactionDto {
    @IsOptional()
    readerId?: string;

    @IsOptional()
    bookId?: string;

    @IsOptional()
    staffId?: string;

    @IsOptional()
    @IsDateString()
    borrowedAt?: Date;

    @IsOptional()
    @IsDateString()
    dueAt?: Date;

    @IsOptional()
    @IsDateString()
    returnedAt?: Date;

    @IsOptional()
    @IsEnum(LoanStatus)
    status?: LoanStatus;

    @IsOptional()
    @IsDateString()
    approvedAt?: Date;

    @IsOptional()
    fine?: number
}

export default UpdateLoanTransactionDto;
