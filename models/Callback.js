const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CallbackSchema = new Schema({
    status_code: {
        type: Number,
    
    },
    status_message: {
        type: String,

    },
    transaction_id: {
        type: String,

    },
    order_id: {
        type: String,

    },
    gross_amount: {
        type: Number,

    },
    payment_type: {
        type: String,

    },
    transaction_time: {
        type: String,

    },
    transaction_status: {
        type: String,

    },
    payment_type: {
        type: String,

    },
    bankva_number: {
        type: String,
        
    },
    bankva_biller: {
        type: String,

    },
    store: {
        type: String,

    },
    payment_code: {
        type: String,

    },
    timestamps: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Callback", CallbackSchema);