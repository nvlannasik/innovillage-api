const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const CartSchema = mongoose.Schema(
  {
    productId: {
      type: Array,
      required: true,
    },
    product: {
      type: Array,
    },
    userId: {
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

CartSchema.plugin(autoIncrement.plugin, "Cart");
module.exports = mongoose.model("Cart", CartSchema);
