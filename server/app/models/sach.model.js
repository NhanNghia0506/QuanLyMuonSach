const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SachSchema = new Schema(
    {
        ten: String,
        gia: Number,
        soquyen: Number,
        namxuatban: Number,
        manxb: { type: ObjectId, ref: 'NhaXuatBan' },
        tacgia: String,
        theloai: String,
    }
); 

module.exports = mongoose.model('Sach', SachSchema);
