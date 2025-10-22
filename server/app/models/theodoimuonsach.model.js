const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TheoDoiMuonSachSchema = new Schema(
    {
        madocgia: { type: ObjectId, ref: 'DocGia' },
        masach: { type: ObjectId, ref: 'Sach' },
        manhanvien: { type: ObjectId, ref: 'NhanVien' },
        ngaymuondukien: Date,
        ngaytradukien: Date,
        ngaytrathucte: Date,
        trangthai: {
            type: String,
            enum: ['Đang chờ duyệt', 'Đã duyệt', 'Đã nhận', 'Đã trả', 'Hủy']
        },
        ghichu: String
    }
)

module.exports = mongoose.model('TheoDoiMuonSach', TheoDoiMuonSachSchema)