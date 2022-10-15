const router = require("express").Router();
const Product = require("../models/Product");
const authenticateJWT = require("../component/verifyToken");
const { productValidation } = require("../component/validation");

//Create product
router.post("/", authenticateJWT, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    imageUrl: req.body.imageUrl,
    harvestDate: req.body.harvestDate,
    expirationDate: req.body.expirationDate,
  });
  try {
    const productSaved = await product.save();
    res.status(201).send({
      status: "success",
      message: "Product created successfully",
      data: {
        product: productSaved,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET Product By ID
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: {
        product: product,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET All Product
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({
      status: "success",
      message: "Product retrieved successfully",
      data: {
        products: products,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//UPDATE Product by ID
router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const product = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          imageUrl: req.body.imageUrl,
          harvestDate: req.body.harvestDate,
          expirationDate: req.body.expirationDate,
        },
      }
    );
    const productUpdated = await Product.findById(req.params.id);
    res.status(203).send({
      status: "success",
      message: "Product updated successfully",
      data: {
        product: productUpdated,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//DELETE Product by ID
router.delete("/:id", authenticateJWT, async (req, res) => {
  if (req.params.id == null) {
    res.status(400).send("ID is required");
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send("Product not found");
  } else {
    await Product.deleteOne({ _id: req.params.id });
    res.status(202).send({
      status: "success",
      message: "Product deleted successfully",
    });
  }
});

module.exports = router;
