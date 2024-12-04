const {Router} = require('express');
const {createNewUsers, getAllUsers, addToCart, addToWishlist, removeFromCart, removeFromWishlist, getCartItems } = require('../controllers/user');
//const { addToCart } = require('../controllers/user.controller');
const router = Router();

router.get("/", getAllUsers);

router.post("/", createNewUsers);
router.post('/:userId/carrito', addToCart);

router.delete("/:userId/carrito", removeFromCart);

router.post('/:userId/wishlist', addToWishlist);
// router.delete("/wishlist/remove/:productId", removeFromWishlist);

// router.post("/cart/add/:productId", addToCart);
// router.delete("/cart/remove/:productId", removeFromCart);
router.get("/:userId/cart", getCartItems);

module.exports = router;