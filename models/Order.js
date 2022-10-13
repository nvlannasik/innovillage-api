const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const OrderSchema = mongoose.Schema({
    productId : {
        type: Number,
        required: true,
        min: 0,
    },
    product : {
        type: Array,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    timestamps: {
        type: Date,
        default: Date.now,
    },
});

OrderSchema.plugin(autoIncrement.plugin, "Order");
module.exports = mongoose.model("Order", OrderSchema);