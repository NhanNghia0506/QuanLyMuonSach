const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocGiaSchema = new Schema(
    {
        HoLot: String,
        Ten: String,
        NgaySinh: Date,
        Phai: {
            type: String,
            enum: ['Nam', 'Nữ']
        },
        DiaChi: String,
        DienThoai: String,
    }
);

module.exports = mongoose.model('DocGia', DocGiaSchema);