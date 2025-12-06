import type { AxiosInstance } from "axios";
import createApiClient from "./api.service";
class LoanTransactionService {
    private api: AxiosInstance
    constructor(baseUrl: string = "/api/loanTransaction") {
        this.api = createApiClient(baseUrl);
    }
    async allTransactions() {
        return await this.api.get(`/allLoans`);
    }

    async approve(loanId: string)  {
        return await this.api.post(`/approve/${loanId}`);
    }

    async confirmBorrow(loanId: string) {
        return await this.api.post(`/checkOutLoan/${loanId}`);
    }

    async confirmReturned(loanId: string) {
        return await this.api.post(`/returnBook/${loanId}`);
    }

    async filterTransactions(query: any) {
        return await this.api.get(`/search`, {
            params: query
        });
    }
}

export default new LoanTransactionService()