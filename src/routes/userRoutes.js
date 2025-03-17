const {authMiddleware, adminMiddleware} = require('../middlewares/authMiddleware');
const express = require('express');
const {getUsers} = require('../controllers/userController');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);

module.exports = router;
