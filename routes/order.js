const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const authenticateJWT = require("./verifyToken");
const { orderValidation } = require("../component/validation");

//Create order
router.post("/", async (req, res) => {
    const order = new Order({
        productId: req.body.productId,
        quantity: req.body.quantity,
        product : await Product.findById(req.body.productId),
    });
    try {
        const orderSaved = await order.save();
        res.send({
        status: "success",
        message: "Order created successfully",
        data: {
            order: orderSaved,
        },
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET Order By ID
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.send({
        status: "success",
        message: "Order retrieved successfully",
        data: {
            order: order,
        },
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET All Order
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.send({
        status: "success",
        message: "Order retrieved successfully",
        data: {
            orders: orders,
        },
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Update Order
router.put("/update/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        order.productId = req.body.productId;
        order.quantity = req.body.quantity;
        order.product = await Product.findById(req.body.productId);
        const orderSaved = await order.save();
        res.send({
        status: "success",
        message: "Order updated successfully",
        data: {
            order: orderSaved,
        },
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Delete Order
router.delete("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        const orderDeleted = await order.remove();
        res.send({
        status: "success",
        message: "Order deleted successfully",
        
        });
    } catch (err) {
        res.status(400).send(err);
    }
});



module.exports = router;
