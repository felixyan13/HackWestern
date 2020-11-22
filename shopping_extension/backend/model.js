const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema({
    storeName: String,
    category: String,
    location: String,
    imageLink: String,
    website: String
});

module.exports = mongoose.model("storesDB", shoppingSchema, "storesDB");