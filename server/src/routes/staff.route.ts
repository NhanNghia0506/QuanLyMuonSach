import  express  from "express";
import staffController from "../controllers/staff.controller";
import validateDto from "../middlewares/validateDto.middleware";
import CreateStaffDto from "../dtos/create.staff.dto";
import LoginStaffDto from "../dtos/login.staff.dto";
import StaffMiddleware from "../middlewares/staff.middleware";

const StaffRoute = express.Router();

StaffRoute.post('/register', StaffMiddleware, validateDto(CreateStaffDto), staffController.create);
StaffRoute.post('/login',validateDto(LoginStaffDto), staffController.login);

export default StaffRoute;