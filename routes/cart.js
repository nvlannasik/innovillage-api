const router = require("express").Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const authenticateJWT = require("../component/verifyToken");

//Create cart

router.post("/", authenticateJWT, async (req, res) => {
  let arrayProduct = [req.body.productId];
  const cart = new Cart({
    userId: req.body.userId,
    productId: arrayProduct,
    quantity: req.body.quantity,
    product: await Product.find({ _id: req.body.productId }),
    totalPrice: req.body.totalPrice,
  });

  const checkStock = await Product.findById(req.body.productId);
  //checkstock if null
  if (checkStock == null) {
    return res.status(400).send({
      status: "failed",
      message: "Product not found",
    });
  }

  if (checkStock.stock < req.body.quantity) {
    return res.status(400).send({
      status: "failed",
      message: "Stock is not enough",
    });
  }

  //check if product already in cart
  const checkCart = await Cart.findOne({ userId: req.body.userId });
  if (checkCart != null) {
    const checkProduct = await Cart.findOne({
      userId: req.body.userId,
      productId: req.body.productId,
    });
    if (checkProduct != null) {
      return res.status(400).send({
        status: "failed",
        message: "Product already in cart",
      });
    }
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

// //GET Cart By ID

// router.get("/:id", authenticateJWT, async (req, res) => {
//   try {
//     const cart = await Cart.findById(req.params.id);
//     res.status(200).send({
//       status: "success",
//       message: "Cart retrieved successfully",
//       data: {
//         cart: cart,
//       },
//     });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

//GET All Cart

router.get("/:userId", authenticateJWT, async (req, res) => {
  if (req.params.userId == null) {
    return res.status(400).send({
      status: "failed",
      message: "User ID is required",
    });
  }
  try {
    const carts = await Cart.find({ userId: req.params.userId });
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

router.patch("/:userId", authenticateJWT, async (req, res) => {
  //check if id not found
  const checkCart = await Cart.findOne({ userId: req.params.userId });
  if (checkCart == null) {
    return res.status(400).send({
      status: "failed",
      message: "Cart not found",
    });
  }

  try {
    const cart = await Cart.updateOne(
      { userId: req.params.userId },
      { $set: { quantity: req.body.quantity } }
    );
    res.status(203).send({
      status: "success",
      message: "Cart updated successfully",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete Cart

router.delete("/:userId", authenticateJWT, async (req, res) => {
  //check if id not found
  const checkCart = await Cart.find({ userId: req.params.userId });
  if (checkCart == null) {
    return res.status(400).send({
      status: "failed",
      message: "Cart not found",
    });
  }

  try {
    const cart = await Cart.deleteOne({ userId: req.params.userId });
    res.status(202).send({
      status: "success",
      message: "Cart deleted successfully",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
