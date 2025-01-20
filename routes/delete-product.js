const express = require('express');
const Product = require('../models/Product');
const Image = require('../models/Image');
const router = express.Router();

router.delete('/', async (req, res) => {
    const productIds = req.body.productIds;

    if (!Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ error: 'Product IDs must be provided as a non-empty array' });
    }

    try {
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found for the provided IDs' });
        }

        const productImageDeletions = products.map(async (product) => {
            const images = await Image.find({ productId: product._id });
            for (const image of images) {
                await Image.findByIdAndDelete(image._id);
            }
        });

        await Promise.all(productImageDeletions);

        await Product.deleteMany({ _id: { $in: productIds } });

        res.status(200).json({
            message: 'Products and associated images deleted successfully.',
            deletedProducts: productIds,
        });
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).json({ error: 'Failed to delete products' });
    }
});

module.exports = router;
