const router = require("express").Router();
const Product = require("../models/Product");
const authenticatePetaniJWT = require("../component/verifyTokenPetani");
const Checkout = require("../models/Checkout");

// Get All Checkout by Petani ID
router.get("/pesanan/:id", authenticatePetaniJWT ,async (req, res) => {
  try {
    const getCheckout = await Checkout.find({product: {
      $in: await Product.find({petaniId: req.params.id})
    }});
    res.status(200).send({
      status: "success",
      message: "Checkout retrieved successfully",
      data: getCheckout,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err,
    });
  }
});


//Update Status Checkout By Petani ---<<< BUTUH AUthentication Petani
router.put("/pesanan/:checkoutID/:id", authenticatePetaniJWT,async (req, res) => {
  try {
    const checkout = await Checkout.findOneAndUpdate(
      { _id : req.params.checkoutID, petaniId : req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.status(200).send({
      status: "success",
      message: "Checkout updated successfully",
      data: checkout
    });
  } catch (err) {
    res.status(400).send(err);
  }
});


//COUNTING ALL PRODUCT COLLECTION
router.get("/product-petani/:id" ,authenticatePetaniJWT,async (req, res) => {
  try {
    const count = await Product.find({
      petaniId: req.params.id,
    }).countDocuments();
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: {
        productCount: count,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//COUNTING ALL CHECOUT STATUS PENDING
router.get("/checkout-petani/:id" ,authenticatePetaniJWT,async (req, res) => {
  try {
    const count = await Checkout.find({
      petaniId: req.params.id,
      status: "pending",
    }).countDocuments();
    res.status(200).send({
      status: "success",
      message: "Checkout retrieved successfully",
      data: {
        checkoutCount: count,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//INCOME petani AMBIL DARI MIDTRANS <--- BELUM

router.get("/income" ,async (req, res) => {
  try {
    const count = await Product.find({
      petaniId: req.body.petaniId,
    }).countDocuments({price: {$sum: req.body.price}});
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: {
        productCount: count,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});





module.exports = router;
