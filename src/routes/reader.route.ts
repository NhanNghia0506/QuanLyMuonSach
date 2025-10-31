import  express  from "express";
import readerController from "../controllers/reader.controller";

const ReaderRoute = express.Router();

ReaderRoute.post('/create', readerController.create);

export default ReaderRoute;