const router = require("express").Router();
const Transaksi = require("../models/Transaksi");
const User = require("../models/User");
const Checkout = require("../models/Checkout");
const Midtrans = require("../models/Midtrans");
const Callback = require("../models/Callback");
const authenticateJWT = require("../component/verifyToken");

// Post Transasksi
router.post("/:id",async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    const statusCheckout = checkout.status;
    const tryCallback = await Callback.find()

    if (statusCheckout == "pesanan selesai"){
      const transaksi = new Transaksi({
        userId: checkout.userId,
        productId: checkout.productId,
        quantity: checkout.quantity,
        product: checkout.product,
        totalPrice: checkout.totalPrice,
        userAddress: checkout.userAddress,
        jasaPengiriman: checkout.jasaPengiriman,
        status: checkout.status,
    })
    const transaksiSaved = await transaksi.save();
    res.status(200).send({
      status: "success",
      message: "Transaksi created successfully",
      data: transaksiSaved,
    });
  }
  }
  catch (err) {
    res.status(400).send({
      status: "failed",
      message: "Transaksi failed",
    });

  }
});

//

module.exports = router;
