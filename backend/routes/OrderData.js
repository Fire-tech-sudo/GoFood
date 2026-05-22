const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    const data = req.body.order_data;
    data.unshift({ Order_date: req.body.order_date });

    try {
        const existingOrder = await Order.findOne({ email: req.body.email });

        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });

            return res.status(200).json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );

            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error("Order Error:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
