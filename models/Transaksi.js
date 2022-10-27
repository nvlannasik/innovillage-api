const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const TransaksiSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    transactionStatus: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    timestamps: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

TransaksiSchema.plugin(autoIncrement.plugin, "Transaksi");
module.exports = mongoose.model("Transaksi", TransaksiSchema);
