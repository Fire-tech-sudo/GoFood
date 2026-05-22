const express = require("express");
const router = express.Router();

router.post("/foodData", async (req, res) => {
    try {
        res.json({
            foodItems: global.food_items,
            foodCategory: global.food_Category
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;