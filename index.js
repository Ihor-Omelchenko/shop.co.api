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

// Маршрут для /product-new
app.get('/product-new', (req, res) => {
    console.log('GET request to /product-new');
    res.json({ message: 'This is the /product-new route!' });
});


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
