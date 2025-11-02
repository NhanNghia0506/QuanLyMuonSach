import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import ReaderRoute from './routes/reader.route';
import BookRouter from './routes/book.route';

dotenv.config()
export const app = express();
app.use(express.json());
app.use('/api/reader', ReaderRoute);
app.use('/api/book', BookRouter);

// Cho phép truy cập file trong thư mục uploads qua URL
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export default app;
