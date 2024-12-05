const {Router} = require('express');
const {createNewUsers, getAllUsers, addToCart, addToWishlist, removeFromCart, removeFromWishList, getCartItems ,getWishList} = require('../controllers/user');
const { validateJWT } = require('../middlewares/verifyJWT');
//const { addToCart } = require('../controllers/user.controller');
const router = Router();

router.get("/",getAllUsers);

router.post("/", createNewUsers);
router.post('/:userId/carrito',[validateJWT], addToCart);

router.delete("/:userId/carrito", [validateJWT],removeFromCart);
router.delete("/:userId/wishlist", [validateJWT],removeFromWishList);

router.post('/:userId/wishlist', [validateJWT],addToWishlist);
// router.delete("/wishlist/remove/:productId", removeFromWishlist);

// router.post("/cart/add/:productId", addToCart);
// router.delete("/cart/remove/:productId", removeFromCart);
router.get("/:userId/cart", getCartItems);
router.get("/:userId/wishlist", getWishList);

module.exports = router;