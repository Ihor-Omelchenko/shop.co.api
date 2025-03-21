const {addProduct, getProducts, deleteProduct} = require('../controllers/productController');
const {authMiddleware, adminMiddleware} = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

router.post('/addProduct', authMiddleware, adminMiddleware, addProduct);
router.get('/', authMiddleware, getProducts);
router.post('/remove', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
