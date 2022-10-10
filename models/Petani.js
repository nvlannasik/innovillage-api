const mongoose = require("mongoose");
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

module.exports = mongoose.model("Petani", PetaniScema);
