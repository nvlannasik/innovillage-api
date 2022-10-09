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
    dateRegist: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserScema);
