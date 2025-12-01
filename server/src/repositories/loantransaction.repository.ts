import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import UpdateLoanTransactionDto from "../dtos/update.loantransaction.dto";
import LoanTransaction from "../models/loantransaction.model";

class LoanTransactionRepository {
    async loanReservation (data: CreateLoanTransactionDto) {
        return await LoanTransaction.create(data);
    }

    async findById(id: string) {
        return await LoanTransaction.findById(id);
    }

    async update(id: string, data: UpdateLoanTransactionDto) {
        return await LoanTransaction.findByIdAndUpdate(id, data, { new: true });
    }

    async getBorrowedCount(bookId: string ) {
        return await LoanTransaction.countDocuments({
            bookId: bookId,
            status: { $in : ['Đang mượn', 'Được duyệt']}
        });
    }

    async setStatus(id: string, status: string) {
        return await LoanTransaction.findByIdAndUpdate(id, { status }, { new: true });
    }

    async filter(filter: Record<string, any>) {
        return LoanTransaction.find(filter)
        .populate("readerId", "name")
        .populate("bookId", "name")
    }

    async findByReaderId(readerId: string) {
        return LoanTransaction.find({ readerId: readerId })
        .populate("bookId", "name")
        .populate("staffId", "name");
    }
}

export default new LoanTransactionRepository();