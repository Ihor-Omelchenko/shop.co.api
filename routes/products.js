const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;

        const query = {};

        if (filters.id) {
            query._id = filters.id;
        }
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        if (filters.category) {
            query.category = filters.category;
        }
        if (filters.minPrice && filters.maxPrice) {
            query.price = { $gte: filters.minPrice, $lte: filters.maxPrice };
        }

        const skip = (page - 1) * limit;

        const products = await Product.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        const totalRecords = await Product.countDocuments(query);

        res.status(200).json({
            products,
            totalRecords,
            currentPage: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalRecords / limit),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

module.exports = router;
