const express = require('express');
const { getUsers } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);

module.exports = router;
