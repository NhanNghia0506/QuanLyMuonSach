import type { AxiosInstance } from "axios";
import createApiClient from "./api.service";
class LoanTransactionService {
    private api: AxiosInstance
    constructor(baseUrl: string = "/api/loanTransaction") {
        this.api = createApiClient(baseUrl);
    }

    async loanReservation(bookId: string) {
        return await this.api.post(`/readerReservation`, { bookId });
    }
    async myLoanTransactions() {
        return await this.api.get(`/myLoans`);
    }
}

export default new LoanTransactionService()