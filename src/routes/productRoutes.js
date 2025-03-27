const {addProduct, getProducts, deleteProduct, updateProduct} = require('../controllers/productController');
const {authMiddleware, adminMiddleware} = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

router.post('/updateProduct', authMiddleware, adminMiddleware, updateProduct);
router.post('/addProduct', authMiddleware, adminMiddleware, addProduct);
router.post('/remove', authMiddleware, adminMiddleware, deleteProduct);
router.get('/', authMiddleware, getProducts);

module.exports = router;
