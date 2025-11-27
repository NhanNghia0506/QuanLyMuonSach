import { model, Schema } from "mongoose";

export interface ILoanTransaction {
    readerId: Schema.Types.ObjectId,
    bookId: Schema.Types.ObjectId,
    staffId?: Schema.Types.ObjectId,
    approvedAt: Date | undefined;
    borrowedAt: Date | undefined, // Ngày mượn
    dueAt: Date | undefined, // Hạn trả
    returnedAt: Date | undefined // Ngày trả
    status: 'Chờ được duyệt' | 'Được duyệt' | 'Đang mượn' | 'Đã trả' | 'Hư hỏng' | 'Trễ hạn' | 'Mất sách'
}

const LoanTransactionSchema = new Schema<ILoanTransaction> (
    {
        readerId: { type: Schema.Types.ObjectId, ref: 'Readers', required: true },
        bookId: { type: Schema.Types.ObjectId, ref: 'Books', required: true },
        staffId: { type: Schema.Types.ObjectId, ref: 'Staffs' },
        approvedAt: { type: Date },
        borrowedAt: { type: Date },
        dueAt: { type: Date },
        returnedAt: { type: Date },
        status: { type: String, enum: ['Chờ được duyệt' , 'Được duyệt' , 'Đang mượn' , 'Đã trả' , 'Hư hỏng' , 'Trễ hạn' , 'Mất sách'], required: true }
    },
    {
        timestamps: true,
    }
)

const LoanTransaction = model<ILoanTransaction>("LoanTransaction", LoanTransactionSchema, 'TheoDoiMuonSach');
export default LoanTransaction