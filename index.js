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
        const product = await Product.find();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err });
    }
});


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
