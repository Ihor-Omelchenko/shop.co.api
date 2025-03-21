const Product = require('../models/Product');
const mongoose = require('mongoose');
const {GridFSBucket} = require('mongodb');

const createProduct = async ({title, description, price, imageId}) => {
    try {
        const db = mongoose.connection.db;

        await db.collection('uploads.files').updateOne(
            {_id: new mongoose.Types.ObjectId(imageId)},
            {$set: {'metadata.temporary': false}}
        );

        const newProduct = new Product({
            title,
            description,
            price,
            imageUrl: `/api/images/${imageId}`
        });

        const saved = await newProduct.save();
        return {product: saved};
    } catch (error) {
        return {error: error.message};
    }
};

const fetchProducts = async (page, limit, search = '', minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER) => {

    const filter = {
        price: {$gte: parseFloat(minPrice), $lte: parseFloat(maxPrice)},
        $or: [
            {title: {$regex: search, $options: 'i'}},
            {description: {$regex: search, $options: 'i'}}
        ]
    };

    const totalProduct = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt: -1});

    return {
        totalProduct,
        totalPages: Math.ceil(totalProduct / limit),
        currentPage: page,
        products,
    };
};

const deleteProductById = async (productId) => {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, {bucketName: 'uploads'});

    const product = await Product.findById(productId);
    if (!product) {
        return {error: 'Product not found', status: 404};
    }

    const imageId = product.imageUrl?.split('/').pop();

    await Product.deleteOne({_id: productId});

    if (imageId) {
        try {
            await bucket.delete(new mongoose.Types.ObjectId(imageId));
        } catch (err) {
            console.warn('The image cannot be deleted:', err.message);
        }
    }

    return {message: 'Product and image successfully deleted'};
};

module.exports = {createProduct, fetchProducts, deleteProductById};
