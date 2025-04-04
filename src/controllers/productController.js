const productService = require('../services/productService');

const addProduct = async (req, res) => {
    const {title, description, category, reviews, status, price, quantity, petType, imageId} = req.body;

    const {product, error} = await productService.createProduct({title, description, category, reviews, status, price, quantity, petType, imageId});

    if (error) {
        return res.status(400).json({error});
    }

    res.status(201).json(product);
};

const updateProduct  = async (req, res) => {
    const {_id, title, description, category, reviews, status, price, quantity, petType, imageUrl} = req.body;

    const {product, error} = await productService.updateProduct({_id, title, description, category, reviews, status, price, quantity, petType, imageUrl});

    if (error) {
        return res.status(400).json({error});
    }

    res.status(201).json(product);
};

const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const {search, minPrice, maxPrice, category, petType } = req.query;

        const result = await productService.fetchProducts(page, limit, search, minPrice, maxPrice, category, petType);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const {productIds} = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ error: 'No productIds provided or not an array' });
        }

        const result = await productService.deleteProductById(productIds);

        if (result.error) {
            return res.status(result.status || 400).json({error: result.error});
        }

        res.json({message: result.message, deleted: result.deleted});
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
};

module.exports = {addProduct, getProducts, deleteProduct, updateProduct};
