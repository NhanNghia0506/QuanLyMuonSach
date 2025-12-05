import  express  from "express"
import BookController from "../controllers/book.controller";
import { upload } from "../middlewares/upload.middelware";
import validateDto from "../middlewares/validateDto.middleware";
import CreateBookDto from "../dtos/create.book.dto";
import StaffMiddleware from "../middlewares/staff.middleware";
import UpdateBookDto from "../dtos/update.book.dto";
const BookRoute = express.Router();

BookRoute.post('/create', StaffMiddleware, upload.single('image'), validateDto(CreateBookDto), BookController.create)
BookRoute.delete('/delete/:id', StaffMiddleware, BookController.delete);
BookRoute.put('/update/:id', StaffMiddleware, upload.single('image'), validateDto(UpdateBookDto), BookController.update);
BookRoute.get('/', BookController.searchBooks);
BookRoute.get('/all', BookController.getAll);
BookRoute.get('/:id', BookController.findById);
export default BookRoute;