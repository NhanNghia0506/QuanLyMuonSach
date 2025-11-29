import  express  from "express";
import LoanTransactionController from "../controllers/loantransaction.controller";
import validateDto from "../middlewares/validateDto.middleware";
import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import StaffMiddleware from "../middlewares/staff.middleware";
import ReaderMiddleWare from "../middlewares/reader.middleware";

const LoanTransactionRoute = express.Router();

LoanTransactionRoute.post('/readerReservation', ReaderMiddleWare, validateDto(CreateLoanTransactionDto), LoanTransactionController.loanReservation);
LoanTransactionRoute.post('/approve/:id', StaffMiddleware, LoanTransactionController.approveLoanTransaction);
LoanTransactionRoute.post('/checkOutLoan/:id', StaffMiddleware, LoanTransactionController.checkOutLoan);
LoanTransactionRoute.get('/search', StaffMiddleware, LoanTransactionController.search);
LoanTransactionRoute.post('/returnBook/:id',StaffMiddleware, LoanTransactionController.returnBook);
export default LoanTransactionRoute;