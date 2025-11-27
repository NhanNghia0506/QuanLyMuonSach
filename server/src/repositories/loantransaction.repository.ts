import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import UpdateLoanTransactionDto from "../dtos/update.loantransaction.dto";
import LoanTransaction from "../models/loantransaction.model";

class LoanTransactionRepository {
    async loanReservation (data: CreateLoanTransactionDto) {
        return await LoanTransaction.create(data);
    }

    async findById(id: String) {
        return await LoanTransaction.findById(id);
    }

    async approveLoanTransaction(id: String, data: UpdateLoanTransactionDto) {
        return await LoanTransaction.findByIdAndUpdate(id, data, { new: true });
    }

    async getBorrowedCount(bookId: string ) {
        return await LoanTransaction.countDocuments({
            bookId: bookId,
            status: { $in : ['Đang mượn', 'Được duyệt']}
        });
    }
}

export default new LoanTransactionRepository();