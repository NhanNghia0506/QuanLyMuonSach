import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import UpdateLoanTransactionDto from "../dtos/update.loantransaction.dto";
import bookRepository from "../repositories/book.repository";
import loantransactionRepository from "../repositories/loantransaction.repository";
class LoanTransactionService {
    async loanReservation(data: CreateLoanTransactionDto, readerId: string) {
        const book = await bookRepository.findById(data.bookId)
        // nếu sách không tồn tại
        if(!book) {
            throw new Error('Sách này không tồn tại')
        } else {
            const dto = {
                ...data,
                status: 'Chờ được duyệt',
                readerId,
                registeredAt: new Date()
            } as CreateLoanTransactionDto
            return await loantransactionRepository.loanReservation(dto);
        }
    }

    async findById(id: string) {
        return await loantransactionRepository.findById(id);
    }

    async approveLoanTransaction(loanId: string, staffId: string) {
        const loanTrans = await loantransactionRepository.findById(loanId);
        const book = await bookRepository.findById(loanTrans?.bookId.toString()!)

        const totalsBorrowed = await loantransactionRepository.getBorrowedCount(loanTrans?.bookId.toString()!)

        // Nếu số lượng sách đã hết 
        if(book?.quantity! - totalsBorrowed < 0) {
            throw new Error('Số lượng sách đã hết')
        }

        const approvedAt = new Date()
        const status = 'Được duyệt'
        const data = {
            staffId,
            status,
            approvedAt 
        } as UpdateLoanTransactionDto;
        return await loantransactionRepository.approveLoanTransaction(loanId, data);
    }
}

export default new LoanTransactionService()