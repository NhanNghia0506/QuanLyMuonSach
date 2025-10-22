const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocGiaSchema = new Schema(
    {
        hoten: String,
        email: String,
        matkhau: String,
        gioitinh: {
            type: String,
            enum: ['Nam', 'Nữ']
        },
        diachi: String,
        sodienthoai: String,
        ngaydangky: Date,
    }
);

module.exports = mongoose.model('DocGia', DocGiaSchema);