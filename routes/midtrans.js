const router = require("express").Router();
const midtransClient = require("midtrans-client");
const Transaksi = require("../models/Transaksi");
const Order = require("../models/Order");
const Midtrans = require("../models/Midtrans");
const User = require("../models/User");



//Create Midtrans Transaction
router.post("/midtrans", async (req, res) => {
    const midtrans = new Midtrans({
        customer_details : await User.findById(req.body.custumer_details),
        item_buy_details : await Order.findById(req.body.item_details),
        transaction_details : await Transaksi.findById(req.body.transaction_details),
        
    });
    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'SB-Mid-server-g7hCHIRuPDTLpD9boALkiaxf'
    });


    try {
        const midtransSaved = await midtrans.save();
        let parameter = midtransSaved

        snap.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            let transactionToken = transaction.token;

            // // transaction redirect url
            // let transactionRedirectUrl = transaction.redirect_url;
        })
        res.status(201).send({
            status: "success",
            message: "Midtrans created successfully",
            token : transactionToken,
        });

    } catch (err) {
        res.status(400).send(err);
    }
});



module.exports = router;