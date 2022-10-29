const mongoose = require("mongoose");
const UserScema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
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
    billing_address: {
      type: String,
    },
    dateRegist: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "user",
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

module.exports = mongoose.model("User", UserScema);
