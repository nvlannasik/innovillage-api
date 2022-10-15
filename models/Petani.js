const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const PetaniScema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    dateRegist: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "petani",
    },
    userName: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  { versionKey: false }
);

PetaniScema.plugin(autoIncrement.plugin, "Petani");
module.exports = mongoose.model("Petani", PetaniScema);
