const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const petaniRouter = require("./routes/petani");
const cors = require("cors");

//cors policy
app.use(cors());

//Midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router Midleware
app.use("/api/user", authRouter);
app.use("/api/petani", petaniRouter);

//connect db
mongoose.connect(process.env.DB_CONNECTION);
let db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Database tidak behasil terkoneksi")
);
db.once("open", () => {
  console.log("Database Berhasil Terkoneksi");
});
//listening port
app.listen(3000, () => {
  console.log("Server Berhasil Terhubung");
});
