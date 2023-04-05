const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('voucher', voucherSchema)