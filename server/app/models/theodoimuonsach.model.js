const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TheoDoiMuonSachSchema = new Schema(
    {
        MaDocGia: { type: ObjectId, ref: 'DocGia' },
        MaSach: { type: ObjectId, ref: 'Sach' },
        NgayMuon: Date,
        NgayTra: Date
    }
)

module.exports = mongoose.model('TheoDoiMuonSach', TheoDoiMuonSachSchema)