import  express  from "express"
import BookController from "../controllers/book.controller";
import { upload } from "../middlewares/upload.middelware";
import validateDto from "../middlewares/validateDto.middleware";
import CreateBookDto from "../dtos/create.book.dto";
const BookRouter = express.Router();

BookRouter.post('/create',upload.single('image'), validateDto(CreateBookDto), BookController.create)
BookRouter.delete('/delete/:id', BookController.delete)
export default BookRouter;