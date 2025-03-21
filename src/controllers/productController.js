const productService = require('../services/productService');

const addProduct = async (req, res) => {
    const {title, description, price, imageId} = req.body;

    const {product, error} = await productService.createProduct({title, description, price, imageId});

    if (error) {
        return res.status(400).json({error});
    }

    res.status(201).json(product);
};

const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const {search, minPrice, maxPrice} = req.query;

        const result = await productService.fetchProducts(page, limit, search, minPrice, maxPrice);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.body;

        if (!productId) {
            return res.status(400).json({error: 'No productId specified'});
        }

        const result = await productService.deleteProductById(productId);

        if (result.error) {
            return res.status(result.status || 400).json({error: result.error});
        }

        res.json({message: result.message});
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
};

module.exports = {addProduct, getProducts, deleteProduct};
