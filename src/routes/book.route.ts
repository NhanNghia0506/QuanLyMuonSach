import  express  from "express"
import BookController from "../controllers/book.controller";
import { upload } from "../middlewares/upload.middelware";
import validateDto from "../middlewares/validateDto.middleware";
import CreateBookDto from "../dtos/create.book.dto";
import StaffMiddleware from "../middlewares/staff.middleware";
const BookRouter = express.Router();

BookRouter.post('/create', StaffMiddleware, upload.single('image'), validateDto(CreateBookDto), BookController.create)
BookRouter.delete('/delete/:id', StaffMiddleware, BookController.delete);
BookRouter.put('/update/:id', StaffMiddleware, upload.single('image'), BookController.update);
BookRouter.get('/', BookController.searchBooks);
export default BookRouter;