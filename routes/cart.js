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
    product: await Product.find({ _id: req.body.productId }),
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

//update cart add product
router.put("/:userId/add", authenticateJWT, async (req, res) => {
  if (req.params.userId == null) {
    return res.status(400).send({
      status: "failed",
      message: "User ID is required",
    });
  }

  const checkproduct = await Product.findById(req.body.productId);

  if (checkproduct == null) {
    return res.status(400).send({
      status: "failed",
      message: "Product not found",
    });
  }

  const checkUserID = await Cart.findOne({ userId: req.params.userId });
  if (checkUserID == null) {
    return res.status(400).send({
      status: "failed",
      message: "User ID not found",
    });
  }

  const checkProduct = await Cart.findOne({
    userId: req.params.userId,
    productId: req.body.productId,
  });

  if (checkProduct != null) {
    return res.status(400).send({
      status: "failed",
      message: "Product already in cart",
    });
  }

  // Check if Product Exist
  const checkCartProductId = await Cart.findOne({
    product : { $elemMatch: { _id: req.body.productId } },
  });
  if (req.body.productId == checkCartProductId) {
    return res.status(400).send({
      status: "failed",
      message: "Product already in cart",

    });
  }

  //update cart to add product
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $push: {
          productId: req.body.productId,
          product: await Product.find({ _id: req.body.productId }),
        },
      },
      { new: true }
    );
    res.status(200).send({
      status: "success",
      message: "Cart updated successfully",
      data: cart
    });
  } catch (err) {
    res.status(400).send(err);
  }
});





//Update Cart
// PR

router.put("/:userId", authenticateJWT, async (req, res) => {
  //check if id not found
  const cartUpdate = await Cart.findOne({ userId: req.params.userId });
  const cartDelProduct = cartUpdate.productId[0]
  const input = req.body.productId

  await Cart.updateMany(
    { userId: req.params.userId },
    //// Remove product sudah bisa tapi remove productID belum bisa
    { $pull: { productId : [input]}, 
     $pull: { product : { _id: input } } 
  });

  const afterupdate = await Cart.findOne({ userId: req.params.userId });
  // SHOW CART AFTER UPDATE
  res.send (afterupdate);

});


//Delete Cart by ID
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const cartDelete = await Cart.deleteOne({ _id: req.params.id });
    res.status(200).send({
      status: "success",
      message: "Cart deleted successfully",
      data: {
        cart: cartDelete,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
