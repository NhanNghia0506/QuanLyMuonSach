import express from "express";
import PublisherController from "../controllers/publisher.controller";
import validateDto from "../middlewares/validateDto.middleware";
import CreatePublisherDto from "../dtos/create.publisher.dto";
import UpdatePublisherDto from "../dtos/update.publisher.dto";
import StaffMiddleware from "../middlewares/staff.middleware";

const PublisherRoute = express.Router();

// Tạo nhà xuất bản mới
PublisherRoute.post(
  "/create",
  StaffMiddleware,
  validateDto(CreatePublisherDto),
  PublisherController.create
);

// Xóa nhà xuất bản
PublisherRoute.delete(
  "/delete/:id",
  StaffMiddleware,
  PublisherController.delete
);

// Cập nhật nhà xuất bản
PublisherRoute.put(
  "/update/:id",
  StaffMiddleware,
  validateDto(UpdatePublisherDto),
  PublisherController.update
);

// Lấy tất cả nhà xuất bản
PublisherRoute.get("/all", PublisherController.getAll);

// Tìm kiếm theo tên nhà xuất bản
PublisherRoute.get("/", PublisherController.searchPublishers);

// Lấy nhà xuất bản theo id
PublisherRoute.get("/:id", PublisherController.findById);

export default PublisherRoute;
