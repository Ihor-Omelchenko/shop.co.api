const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit);

        const totalRecords = await Product.countDocuments();

        res.status(200).json({
            products,
            totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
        });
    } catch (err) {
        res.status(500).json({error: 'Error fetching product'});
    }
});

module.exports = router;
