const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const CheckoutSchema = mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    min: 0,
  },
  product: {
    type: Array,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  address : {
    type: String,
  },
  user_id: {
    type : String,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

CheckoutSchema.plugin(autoIncrement.plugin, "Checkout");
module.exports = mongoose.model("Checkout", CheckoutSchema);
