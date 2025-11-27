import  express  from "express";
import loanTransactionController from "../controllers/loantransaction.controller";
import validateDto from "../middlewares/validateDto.middleware";
import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";

const LoanTransactionRoute = express.Router();

LoanTransactionRoute.post('/readerReservation', validateDto(CreateLoanTransactionDto), loanTransactionController.loanReservation);

export default LoanTransactionRoute;