const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const petaniRouter = require("./routes/petani");
const productRouter = require("./routes/product");
const checkoutRouter = require("./routes/checkout");
const adminRouter = require("./routes/admin");
const dashboardRouter = require("./routes/dashboard");
const transaksiRouter = require("./routes/transaksi");
const refreshTokenRouter = require("./routes/refreshToken");
const cartRouter = require("./routes/cart");
const midtrans = require("./routes/midtrans");
const cors = require("cors");
require("dotenv").config();
const multer = require('multer')


//cors policy
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

//Midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
app.use(multerMid.single('imageUrl'))

//router Midleware
app.use("/api/user", authRouter);
app.use("/api/petani", petaniRouter);
app.use("/api/product", productRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/admin", adminRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/transaksi", transaksiRouter);
app.use("/api/refresh-token", refreshTokenRouter);
app.use("/api/cart", cartRouter);
app.use("/api/midtrans", midtrans);

//Test Show Midtrans Frontend
app.set("view engine", "ejs");

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
app.listen(process.env.PORT_SERVER, () => {
  console.log("Server Berhasil Terhubung");
});
