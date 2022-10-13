const router = require('express').Router();
const Product = require('../models/Product');
const authenticateJWT = require('./verifyToken');
const { productValidation } = require('../component/validation');

//Create product
router.post('/create', async (req, res) => {
  const product = new Product({
    name : req.body.name,
    description : req.body.description,
    price: req.body.price,
    stock : req.body.stock,
    imageUrl: req.body.imageUrl,
    harvestDate: req.body.harvestDate,
    expirationDate: req.body.expirationDate,
  });
  try {
    const productSaved = await product.save();
    res.send({
        status: 'success',
        message: 'Product created successfully',
        data: {
            product : productSaved,
        }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET Product By ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.send({
            status: 'success',
            message: 'Product retrieved successfully',
            data: {
                product : product,
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET All Product
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send({
            status: 'success',
            message: 'Product retrieved successfully',
            data: {
                products : products,
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//UPDATE Product by ID
router.put('/update/:id', async (req, res) => {
    try {
        const product = await Product.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name : req.body.name,
                    description : req.body.description,
                    price: req.body.price,
                    stock : req.body.stock,
                    imageUrl: req.body.imageUrl,
                    harvestDate: req.body.harvestDate,
                    expirationDate: req.body.expirationDate,
                },
            }
        );
        const productUpdated = await Product.findById(req.params.id);
        res.send({
            status: 'success',
            message: 'Product updated successfully',
            data: {
                product : productUpdated,
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE Product by ID
router.delete('/delete/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            status: 'error',
            message: 'Product id is required',
        });
    }
    try {
        await Product.deleteOne({ _id: req.params.id });
        res.send({
            status: 'success',
            message: 'Product deleted successfully',
        });
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;