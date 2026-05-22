const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/myOrder', async (req, res) => {
    try {
        const userOrders = await Order.findOne({ email: req.body.email });

        if (!userOrders || !Array.isArray(userOrders.order_data)) {
            return res.status(200).json([]); // return empty array instead of message
        }

        res.status(200).json(userOrders.order_data);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
