const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    imageUrl: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
