import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app.error";
import loantransactionService from "../services/loantransaction.service";

class LoanTransactionController {
    // Hàm để reader đăng kí mượn online 
    async loanReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const loanTrans = await loantransactionService.loanReservation(req.body, req.reader?.id!)
            res.status(201).json({ loanTrans });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    // Hàm để staff duyệt phiếu đăng ký online của reader
    async approveLoanTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const loanId = req.params.id;
            const loan = await loantransactionService.approveLoanTransaction(loanId!, req.staff?.id!);
            res.status(201).json({ loan });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }

    // Hàm chuyển đổi trạng thái khi đọc giả lại lấy sách sau khi đăng kí mượn được duyệt
    async checkOutLoan(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const loanId = req.params.id;
            const loan = await loantransactionService.checkOutLoan(loanId);
            res.status(201).json({ loan });
        } catch (error: any) {
            next(new AppError(error.message, 400));
        }
    }
    
    // Hàm tìm kiếm phiếu mượn sách

    //Hàm chuyển đổi trạng thái khi đọc giả lại trả sách

    // Hủy yêu cầu mượn


}

export default new LoanTransactionController();
