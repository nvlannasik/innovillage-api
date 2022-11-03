const router = require("express").Router();
const Product = require("../models/Product");
const authenticatePetaniJWT = require("../component/verifyTokenPetani");

//COUNTING ALL PRODUCT COLLECTION
router.get("/product" ,async (req, res) => {
  try {
    const count = await Product.find({
      petaniId: req.body.petaniId,
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
