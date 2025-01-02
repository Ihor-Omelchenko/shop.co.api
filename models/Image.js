const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    productId: String,
    imageData: String,
    fileName: String,
}, { collection: 'images' });

module.exports = mongoose.model('Image', ImageSchema);
