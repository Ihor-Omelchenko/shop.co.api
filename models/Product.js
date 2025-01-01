const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    img: String, // URL для доступу до зображення
    imageData: String, // Base64 дані зображення
    price: Number,
    discount: Number,
    category: String,
    rating: Number,
    quantity: Number,
    timerEndsAt: Number,
    creationDate: Number,
    updateDate: Number
}, { collection: 'products' });

module.exports = mongoose.model('Item', ProductSchema);
