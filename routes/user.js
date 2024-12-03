const {Router} = require('express');
const {createNewUsers, getAllUsers, addToCart, addToWishlist, removeFromCart, removeFromWishlist, getCartItems } = require('../controllers/user');
//const { addToCart } = require('../controllers/user.controller');
const router = Router();

router.get("/", getAllUsers);

router.post("/", createNewUsers);
router.post('/:userId/carrito', addToCart);

// router.post("/wishlist/add/:productId", addToWishlist);
// router.delete("/wishlist/remove/:productId", removeFromWishlist);

// router.post("/cart/add/:productId", addToCart);
// router.delete("/cart/remove/:productId", removeFromCart);
// router.get("/cart", getCartItems);

module.exports = router;