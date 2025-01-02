const express = require('express');
const Product = require('../models/Product');
const Image = require('../models/Image');
const router = express.Router();

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const images = await Image.find({ productId });
        for (const image of images) {
            await Image.findByIdAndDelete(image._id);
        }

        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product and associated images deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;
