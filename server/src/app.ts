import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import ReaderRoute from './routes/reader.route';
import BookRoute from './routes/book.route';
import AppError from './utils/app.error';
import errorHandler from './middlewares/error.handler';
import StaffRoute from './routes/staff.route';
import LoanTransactionRoute from './routes/loantransaction.route';
import PublisherRoute from './routes/publisher.route';

dotenv.config()
export const app = express();
app.use(express.json());
app.use('/api/reader', ReaderRoute);
app.use('/api/book', BookRoute);
app.use('/api/staff', StaffRoute);
app.use('/api/loanTransaction', LoanTransactionRoute);
app.use('/api/publisher', PublisherRoute);

// Cho phép truy cập file trong thư mục uploads qua URL
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})



app.use(errorHandler);
export default app;
