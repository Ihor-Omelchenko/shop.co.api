const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./src/config/db');
const startCleaner = require('./src/utils/cleaner');

const productRoutes = require('./src/routes/productRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const imageRoutes = require('./src/routes/imageRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({origin: '*',}));

app.use('/api/products', productRoutes)
app.use('/api/admins', adminRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/auth', authRoutes);

startCleaner();

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));

