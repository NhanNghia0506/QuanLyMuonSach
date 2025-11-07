import  express  from "express";
import staffController from "../controllers/staff.controller";

const StaffRoute = express.Router();

StaffRoute.post('/register', staffController.create);

export default StaffRoute;