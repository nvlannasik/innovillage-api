const router = require("express").Router();
const Product = require("../models/Product");

//COUNTING ALL PRODUCT COLLECTION
router.get("/product", async (req, res) => {
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

//GET ALL PRODUCT COLLECTION
router.get("/", async (req, res) => {
  try {
    const product = await Product.find({
      petaniId: req.body.petaniId,
    });
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Transaction History
router.get("/transaction", async (req, res) => {
  try {
    const transaction = await Product.find({
      petaniId: req.body.petaniId,
    });
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
