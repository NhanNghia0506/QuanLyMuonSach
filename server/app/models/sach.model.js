const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SachSchema = new Schema(
    {
        TenSach: String,
        DonGia: Number,
        SoQuyen: Number,
        NamXuatBan: Number,
        MaNXB: { type: ObjectId, ref: 'NhaXuatBan' },
        TacGia: String
    }
); 

module.exports = mongoose.model('Sach', SachSchema);
