const router = require("express").Router();
const midtransClient = require("midtrans-client");
const Order = require("../models/Order");
const Midtrans = require("../models/Midtrans");
const User = require("../models/User");
const Callback = require("../models/Callback");
const axios = require("axios");


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

//Midtrans API CALLBACK
router.post("/callback", async (req, res) => {
    const CallbackData = await axios.get(`https://api.sandbox.midtrans.com/v2/${req.body.order_id}/status`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic U0ItTWlkLXNlcnZlci1nN2hDSElSdVBEVExwRDlib0FMa2lheGY6'
        }
    })
    const callback = new Callback({
        order_id: CallbackData.data.order_id,
        gross_amount: CallbackData.data.gross_amount,
        payment_type: CallbackData.data.payment_type,
        transaction_time: CallbackData.data.transaction_time,
        transaction_status: CallbackData.data.transaction_status,
        status_code: CallbackData.data.status_code,
        status_message: CallbackData.data.status_message,
        bankva_number: CallbackData.data.va_numbers[0].va_number,
        bankva_biller: CallbackData.data.va_numbers[0].bank,
    });
    const CallbackSaved = await callback.save();
    res.status(200).send({
        status: "success",
        message: "Callback created successfully",
        data: CallbackSaved
    });
});

//Get All data callback
router.get("/callback", async (req, res) => {
    try {
        const callback = await Callback.find();
        res.status(200).send({
            status: "success",
            message: "Call created successfully",
            data: {
                callback: callback,
            },
        });
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;

