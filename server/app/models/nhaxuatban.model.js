const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhaXuatBanSchema = new Schema(
    {
        TenNXB: String,
        DiaChi: String,
    }
);

module.exports = mongoose.model("NhaXuatBan", NhaXuatBanSchema);