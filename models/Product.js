const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 25,
    },
    description: {
      type: String,
      required: true,
      min: 6,
      max: 25,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    harvestDate: {
      type: String,
      required: true,
    },
    expirationDate: {
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

ProductSchema.plugin(autoIncrement.plugin, "Product");
module.exports = mongoose.model("Product", ProductSchema);
