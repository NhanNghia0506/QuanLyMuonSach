import  express  from "express";
import readerController from "../controllers/reader.controller";

const ReaderRoute = express.Router();

ReaderRoute.post('/register', readerController.create);
ReaderRoute.post('/login', readerController.login);

export default ReaderRoute;