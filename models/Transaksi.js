const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const TransaksiSchema = mongoose.Schema(
  {
    productId: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status : {
      type: String,
      required: true,
    },
    jasaPengiriman: {
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
