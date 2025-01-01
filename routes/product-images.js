const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/:id/image', async (req, res) => {
    console.log(`Request received for image with ID: ${req.params.id}`);
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ error: 'Product not found' });
        }

        if (!product.imageData) {
            console.log('Image data not found for product');
            return res.status(404).json({ error: 'Image not found' });
        }

        const imgBuffer = Buffer.from(product.imageData, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': imgBuffer.length,
        });
        res.end(imgBuffer);
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ error: 'Failed to retrieve image' });
    }
});

module.exports = router;
