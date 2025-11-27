import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import UpdateLoanTransactionDto from "../dtos/update.loantransaction.dto";
import loantransactionRepository from "../repositories/loantransaction.repository";
class LoanTransactionService {
    async loanReservation(data: CreateLoanTransactionDto, readerId: string) {
        const dto = {
            ...data,
            status: 'Chờ được duyệt',
            readerId,
            registeredAt: new Date()
        } as CreateLoanTransactionDto
        return await loantransactionRepository.loanReservation(dto);
    }

    async findById(id: string) {
        return await loantransactionRepository.findById(id);
    }

    async approveLoanTransaction(loanId: string, staffId: string) {
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