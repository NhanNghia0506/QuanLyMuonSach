import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import loantransactionRepository from "../repositories/loantransaction.repository";
class LoanTransactionService {
    async create(data: CreateLoanTransactionDto) {
        return await loantransactionRepository.create(data);
    }
}

export default new LoanTransactionService()