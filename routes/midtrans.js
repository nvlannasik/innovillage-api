const router = require("express").Router();
const midtransClient = require("midtrans-client");
const Order = require("../models/Order");
const Midtrans = require("../models/Midtrans");
const User = require("../models/User");


// Create Snap API Midtrans
router.post("/snap", async (req, res) => {
    // Connect MidTrans
    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey : 'SB-Mid-server-g7hCHIRuPDTLpD9boALkiaxf'
    });

    // Midtrans Fetch Data
    const midtrans = new Midtrans({
        customer_details: await User.findById({ _id: req.body.customer_details }),
        item_buy_details: await Order.findById({ _id: req.body.item_buy_details }),
        });
    const MidtransSaved = await midtrans.save();

    //Fetch Data
    const gross_amount = MidtransSaved.item_buy_details.map((item) => item.totalPrice)[0]
    const customer_name = MidtransSaved.customer_details.map((item) => item.name)[0]
    const customer_email = MidtransSaved.customer_details.map((item) => item.email)[0]
    const customer_phone = MidtransSaved.customer_details.map((item) => item.phoneNumber)[0]
    const item_id = MidtransSaved.item_buy_details.map((item) => item._id)[0]
    const item_price = MidtransSaved.item_buy_details.map((item) => item.product.map((item) => item.price))[0][0]
    const item_quantity = MidtransSaved.item_buy_details.map((item) => item.quantity)[0]
    const item_name = MidtransSaved.item_buy_details.map((item) => item.product.map((item) => item.name))[0][0]
    const item_address = MidtransSaved.item_buy_details.map((item) => item.address)[0]
   
    // Create Parameter for Midtrans
    let parameter = {
        "transaction_details": {
            "order_id": MidtransSaved._id,
            "gross_amount": gross_amount,
        },
        "item_details": {
            "id": item_id,
            "price": item_price,
            "quantity": item_quantity,
            "name": item_name,
        },
        "customer_details": {
            "first_name": customer_name,
            "email": customer_email,
            "phone": customer_phone,
            "billing_address": {
                "first_name": customer_name,
                "email": customer_email,
                "phone": customer_phone,
                "address": item_address,
                "city": "Jakarta",
                "postal_code": "16602",
                "country_code": "IDN"
            }
        },
        "shipping_address": {
            "first_name": customer_name,
            "email": customer_email,
            "phone": customer_phone,
            "address": item_address,
            "city": "Jakarta",
            "postal_code": "16602",
            "country_code": "IDN"
        },
        
    };
    snap.createTransaction(parameter)
    .then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        res.status(200).send({
            status: "success",
            message: "Order created successfully",
            data: {
                token: transactionToken,
            },
        });
    }
    );

});

//Test Midtrans View
router.get("/view", async (req, res) => {
    res.render('show');
});


module.exports = router;

