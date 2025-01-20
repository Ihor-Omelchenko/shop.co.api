const express = require('express');
const Product = require('../models/Product');
const ImageModel = require('../models/Image');
const multer = require('multer');
const router = express.Router();
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage });
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

router.put('/:id', upload.array('images', 10), async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const newImageUrls = [];
        if (req.files && req.files.length > 0) {
            await ImageModel.deleteMany({ productId });

            for (const file of req.files) {
                const base64Image = file.buffer.toString('base64');
                const fileName = `${Date.now()}-${file.originalname}`;

                const newImage = new ImageModel({
                    productId,
                    imageData: base64Image,
                    fileName,
                });
                const savedImage = await newImage.save();

                const imageUrl = `${baseUrl}/images/${savedImage._id}`;
                newImageUrls.push(imageUrl);
            }

            updatedData.images = newImageUrls;
        }

        updatedData.updateDate = Date.now();

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
            new: true,
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

module.exports = router;
