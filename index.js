const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const Product = require('./models/Product');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('Connection error:', err));

// const productNewRoute = require('./routes/product-new');
//
// app.use('/product-new', productNewRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/product-new', async (req, res) => {
    try {
        // Статичний JSON-відповідь
        const products = [
            { id: 1, name: 'Product 1', price: 100 },
            { id: 2, name: 'Product 2', price: 200 },
            { id: 3, name: 'Product 3', price: 300 }
        ];
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
});


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
