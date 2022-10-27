const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const MidtransSchema = mongoose.Schema({
    customer_details: {
        type : Array,
    },
    
    item_buy_details: {
        type: Array,
    },
    timestamps: {
        type: Date,
        default: Date.now,
    },
});

MidtransSchema.plugin(autoIncrement.plugin, "Midtrans");
module.exports = mongoose.model("Midtrans", MidtransSchema);
