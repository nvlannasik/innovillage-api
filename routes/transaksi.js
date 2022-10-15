const router = require("express").Router();
const Transaksi = require("../models/Transaksi");
const authenticateJWT = require("../component/verifyToken");

//POST Transaksi
router.post("/", authenticateJWT, async (req, res) => {
  const transaksi = new Transaksi({
    orderId: req.body.orderId,
    productId: req.body.productId,
    userId: req.body.userId,
    userName: req.body.userName,
    userAddress: req.body.userAddress,
    userPhoneNumber: req.body.userPhoneNumber,
    totalPrice: req.body.totalPrice,
    transactionStatus: req.body.transactionStatus,
    deliveryStatus: req.body.deliveryStatus,
    paymentMethod: req.body.paymentMethod,
  });
  try {
    const transaksiSaved = await transaksi.save();
    res.status(201).send({
      status: "success",
      message: "Transaksi created successfully",
      data: {
        transaksi: transaksiSaved,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET Transaksi By ID
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const transaksi = await Transaksi.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Transaksi retrieved successfully",
      data: {
        transaksi: transaksi,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
