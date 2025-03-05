const express = require('express');
const {registerUser, loginUser, deleteUser} = require('../controllers/authController');
const {authMiddleware, adminMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/user/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
