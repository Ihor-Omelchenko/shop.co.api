const Product = require('../models/Product');
const mongoose = require('mongoose');
const {GridFSBucket} = require('mongodb');

const createProduct = async ({title, description, category, reviews, status, price, quantity, petType, imageId}) => {
    try {
        const db = mongoose.connection.db;

        await db.collection('uploads.files').updateOne(
            {_id: new mongoose.Types.ObjectId(imageId)},
            {$set: {'metadata.temporary': false}}
        );

        const newProduct = new Product({
            title,
            description,
            category,
            reviews,
            status,
            price,
            quantity,
            petType,
            imageUrl: `/api/images/${imageId}`
        });

        const saved = await newProduct.save();
        return {product: saved};
    } catch (error) {
        return {error: error.message};
    }
};

const updateProduct = async ({ _id, title, description, category, reviews, status, quantity, price, petType, imageUrl }) => {
    try {
        const product = await Product.findById(_id);
        if (!product) {
            return { error: 'Product not found' };
        }

        const db = mongoose.connection.db;
        const prevImageId = product.imageUrl?.split('/').pop();
        const newImageId = imageUrl?.split('/').pop();

        if (newImageId && newImageId !== prevImageId) {
            if (prevImageId) {
                await db.collection('uploads.files').deleteOne({ _id: new mongoose.Types.ObjectId(prevImageId) });
                await db.collection('uploads.chunks').deleteMany({ files_id: new mongoose.Types.ObjectId(prevImageId) });
            }

            await db.collection('uploads.files').updateOne(
                { _id: new mongoose.Types.ObjectId(newImageId) },
                { $set: { 'metadata.temporary': false } }
            );

            product.imageUrl = imageUrl;
        }

        product.title = title;
        product.description = description;
        product.category = category;
        product.reviews = reviews;
        product.status = status;
        product.price = price;
        product.quantity = quantity;
        product.updatedAt = new Date();
        product.petType = petType;

        const updated = await product.save();

        return { product: updated };
    } catch (error) {
        return { error: error.message };
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

    if (mongoose.Types.ObjectId.isValid(search)) {
        filter.$or.push({_id: search});
    }


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

const deleteProductById = async (productIds) => {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const deleted = [];

    for (const productId of productIds) {
        const product = await Product.findById(productId);
        if (!product) {continue}

        const imageId = product.imageUrl?.split('/').pop();

        await Product.deleteOne({_id: productId});
        deleted.push(productId);

        if (imageId) {
            try {
                await bucket.delete(new mongoose.Types.ObjectId(imageId));
            } catch (err) {
                console.warn(`Image for product ${productId} could not be deleted:`, err.message);
            }
        }
    }

    return {message: `${deleted.length} product(s) successfully deleted`, deleted};
};

module.exports = {createProduct, fetchProducts, deleteProductById, updateProduct};
