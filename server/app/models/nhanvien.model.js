const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NhanVienSchema = new Schema(
    {
        hoten: String,
        email: String,
        matkhau: String,
        chucvu: {
            type: String,
            enum: ['Quản lí', 'Thu ngân']
        },
        diachi: String,
        sodienthoai: String
    }
);

module.exports = mongoose.model('NhanVien', NhanVienSchema);
