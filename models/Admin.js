const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
    userName: {
      type: String,
      required: true,
    },
    dateRegist: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Admin", AdminSchema);
