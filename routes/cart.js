const router = require("express").Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");

//Create cart

router.post("/", async (req, res) => {
  let arrayProduct = [req.body.productId];
  const cart = new Cart({
    productId: arrayProduct,
    quantity: req.body.quantity,
    product: await Product.find({ _id: req.body.productId }),
    userId: req.body.userId,
    totalPrice: req.body.totalPrice,
  });

  const checkStock = await Product.findById(req.body.productId);
  if (checkStock.stock < req.body.quantity) {
    return res.status(400).send({
      status: "failed",
      message: "Stock is not enough",
    });
  }

  try {
    const cartSaved = await cart.save();
    res.status(201).send({
      status: "success",
      message: "Cart created successfully",
      data: {
        cart: cartSaved,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET Cart By ID

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Cart retrieved successfully",
      data: {
        cart: cart,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET All Cart

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send({
      status: "success",
      message: "Cart retrieved successfully",
      data: {
        carts: carts,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update Cart

router.patch("/:id", async (req, res) => {
  try {
    const cart = await Cart.updateOne(
      { _id: req.params.id },
      { $set: { quantity: req.body.quantity } }
    );
    res.status(200).send({
      status: "success",
      message: "Cart updated successfully",
      data: {
        cart: cart,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete Cart

router.delete("/:id", async (req, res) => {
  try {
    const cart = await Cart.deleteOne({ _id: req.params.id });
    res.status(200).send({
      status: "success",
      message: "Cart deleted successfully",
      data: {
        cart: cart,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
