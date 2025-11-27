import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import LoanTransaction from "../models/loantransaction.model";

class LoanTransactionRepository {
    async create (data: CreateLoanTransactionDto) {
        return await LoanTransaction.create(data);
    }
}

export default new LoanTransactionRepository();