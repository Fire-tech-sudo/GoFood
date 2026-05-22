const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CLOUD_URL);
        console.log("✅ Connected to MongoDB successfully");

        const foodData = await mongoose.connection.db.collection("foodData").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = foodData;
        global.food_Category = foodCategory;

    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = mongoDB;