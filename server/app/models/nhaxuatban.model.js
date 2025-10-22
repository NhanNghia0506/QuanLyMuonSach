const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhaXuatBanSchema = new Schema(
    {
        tennxb: String,
        diachi: String,
    }
);

module.exports = mongoose.model("NhaXuatBan", NhaXuatBanSchema);