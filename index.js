const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('Connection error:', err));

const allProductRoute = require('./routes/products');
const addNewProductRoute = require('./routes/add-new-product');
const productImagesRoute = require('./routes/product-images');
const deleteProductRoute = require('./routes/delete-product');
const editProductRoute = require('./routes/edit-product');

app.use('/products', allProductRoute);
app.use('/addProduct', addNewProductRoute);
app.use('/images', productImagesRoute);
app.use('/deleteProduct', deleteProductRoute);
app.use('/editProduct', editProductRoute);

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
