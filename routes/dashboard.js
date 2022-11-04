const router = require("express").Router();
const Product = require("../models/Product");
const authenticatePetaniJWT = require("../component/verifyTokenPetani");
const Checkout = require("../models/Checkout");

// Get All Checkout by Petani ID
router.get("/ini/:id", async (req, res) => {
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
//Get Checkout by ProductId and PetaniId --<<< Butuh AUthentication Petani
router.get("/:checkoutId/:productId/:id", async (req, res) => {
  try {
    //Check Product id and petani Id at checkout
    const checkout = await Checkout.find({
      _id: req.params.checkoutId,
      productId: req.params.productId,
      petaniId : req.params.id
    });
    if (checkout != null) {
      res.status(200).send({
        status: "success",
        message: "Checkout retrieved successfully",
        data: checkout 
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "failed",
      message: "Checkout not found",
    });
  }
});

//Update Status Checkout By Petani ---<<< BUTUH AUthentication Petani
router.put("/:checkoutID/:productId/:id", async (req, res) => {
  try {
    const checkout = await Checkout.findOneAndUpdate(
      { _id : req.params.checkoutID,productId: req.params.productId, petaniId : req.params.id },
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
router.get("/:id" ,async (req, res) => {
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
//Income Manual

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


//TRANSAKSI USER BERHASIL AMBIL DARI MIDTRANS <--- BELUM
router.get("/transaksi/berhasil" ,async (req, res) => {
  try {
    const count = await Product.find({
      petaniId: req.body.petaniId,
    }).countDocuments({status: "success"});
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

//TRANSAKSI USER BELUM BAYAR AMBIL DARI MIDTRANS <--- BELUM

router.get("/transaksi/pending" ,async (req, res) => {
  try {
    const count = await Product.find({
      petaniId: req.body.petaniId,
    }).countDocuments({status: "pending"});
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

//TRANSAKSI USER BATAL AMBIL DARI MIDTRANS <--- BELUM

router.get("/transaksi/batal" ,async (req, res) => {
  try {
    const count = await Product.find({
      petaniId: req.body.petaniId,
    }).countDocuments({status: "batal"});
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
