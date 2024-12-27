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

const productNewRoute = require('./routes/product-new');

app.use('/product-new', productNewRoute);

app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Test route works' });
});

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
