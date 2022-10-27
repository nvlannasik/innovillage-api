const { array } = require("joi");
const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const MidtransSchema = mongoose.Schema({
    customer_details: {
        type : array,
        required: true,
    },
    item_buy_details: {
        type: array,
        required: true,
    },
    transaction_details: {
        type: array,
        required: true,
    },
    timestamps: {
        type: Date,
        default: Date.now,
    },
});

MidtransSchema.plugin(autoIncrement.plugin, "Midtrans");
module.exports = mongoose.model("Midtrans", MidtransSchema);
