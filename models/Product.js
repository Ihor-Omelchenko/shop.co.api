const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id: String,
    title: String,
    images: [String],
    price: Number,
    discount: Number,
    category: String,
    rating: Number,
    quantity: Number,
    timerEndsAt: Number,
    creationDate: {
        type: Number,
        default: () => Date.now()
    },
    updateDate: {
        type: Number,
        default: () => Date.now()
    }
}, { collection: 'products' });

ProductSchema.pre('save', function (next) {
    this.updateDate = Date.now();
    next();
});

module.exports = mongoose.model('Item', ProductSchema);
