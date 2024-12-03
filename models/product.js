const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    //_id: String,
    title: String,
    price: Number,
    description: String,
    category: String,
    type: String,
    image: String,
    marca: String,
    rating: {
        rate: Number,
        count: Number
    }
})

module.exports = mongoose.model("Product", productSchema);