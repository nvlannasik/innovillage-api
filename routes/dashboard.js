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

module.exports = router;
