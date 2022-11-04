const router = require("express").Router();
const Checkout = require("../models/Checkout");
const Product = require("../models/Product");
const authenticateJWT = require("../component/verifyToken");
const Cart = require("../models/Cart");

//Create checkout
router.post("/", authenticateJWT, async (req, res) => {
  const checkout = new Checkout({
    productId: req.body.productId,
    userId: req.body.userId,
    quantity: req.body.quantity,
    product: await Product.findById(req.body.productId),
    //totalPrice
    totalPrice: req.body.totalPrice,
    userAddress: req.body.userAddress,
    jasaPengiriman: req.body.jasaPengiriman,
    status: req.body.status,
  });
  try {
    const checkoutSaved = await checkout.save();
    //delete all cart by user id
    await Cart.deleteMany({ userId: req.body.userId });
    res.status(201).send({
      status: "success",
      message: "Checkout created successfully",
      data: {
        checkout: checkoutSaved,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET Checkout By ID
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Checkout retrieved successfully",
      data: {
        checkout: checkout,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET All Checkout
router.get("/", async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.status(200).send({
      status: "success",
      message: "Checkout retrieved successfully",
      data: {
        checkouts: checkouts,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update Checkout
router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    checkout.productId = req.body.productId;
    checkout.quantity = req.body.quantity;
    checkout.product = await Product.findById(req.body.productId);
    const checkoutSaved = await checkout.save();
    res.status(203).send({
      status: "success",
      message: "Checkout updated successfully",
      data: {
        checkout: checkoutSaved,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete Checkout
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    const checkoutDeleted = await checkout.remove();
    res.status(202).send({
      status: "success",
      message: "Checkout deleted successfully",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
