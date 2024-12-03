const {Router} = require('express');
const { getAllProducts, createNewProducts, getProductById, deleteTvShow, updateTvShow } = require('../controllers/products');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/" ,createNewProducts);
//[validateJWT, verifyAdminRole]
router.delete("/:id", deleteTvShow);

router.put("/:id", updateTvShow);

module.exports = router;