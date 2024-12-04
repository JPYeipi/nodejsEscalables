const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: "user"
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    carrito: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
})

module.exports = mongoose.model("User", userSchema);