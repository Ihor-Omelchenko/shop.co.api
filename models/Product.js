const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    img: String,
    price: Number,
    discount: Number,
    category: String,
    rating: Number,
    quantity: Number,
    timerEndsAt: Number,
    creationDate: Number,
    updateDate: Number
}, { collection: 'new-products' });

module.exports = mongoose.model('Item', ProductSchema);
