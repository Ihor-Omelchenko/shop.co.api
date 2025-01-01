const express = require('express');
const Product = require('../models/Product');
const multer = require('multer');
const router = express.Router();
require('dotenv').config();


const storage = multer.memoryStorage();
const upload = multer({ storage });
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const productData = req.body;

        if (!productData._id || !productData.title || !productData.price || !productData.category) {
            return res.status(400).json({ error: 'Some required fields are missing' });
        }

        const existingProduct = await Product.findById(productData._id);
        if (existingProduct) {
            return res.status(409).json({ error: 'Product with this ID already exists' });
        }

        if (req.file) {
            productData.imageData = req.file.buffer.toString('base64');
            productData.img = `${baseUrl}/products/${productData._id}/image`;
        } else {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

module.exports = router;
