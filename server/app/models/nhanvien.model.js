const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NhanVienSchema = new Schema(
    {
        HoTenNV: String,
        Password: String,
        ChucVu: {
            type: String,
            enum: ['Quản lí', 'Thu ngân']
        },
        DiaChi: String,
        SoDienThoai: String
    }
);

module.exports = mongoose.model('NhanVien', NhanVienSchema);
