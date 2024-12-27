const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err });
    }

    res.json({ message: 'This is the /product-new route!' });
});

module.exports = router;
