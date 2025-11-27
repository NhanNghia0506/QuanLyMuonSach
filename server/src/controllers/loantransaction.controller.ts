import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app.error";
import loantransactionService from "../services/loantransaction.service";

class LoanTransactionController {
    // Hàm để reader đăng kí mượn online 
    async loanReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const loanTrans = await loantransactionService.create(req.body)
            res.status(201).json({ loanTrans });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }
}

export default new LoanTransactionController();
