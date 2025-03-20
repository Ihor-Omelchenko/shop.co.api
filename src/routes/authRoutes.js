const {registerUser, loginUser, deleteUser, newToken} = require('../controllers/authController');
const {authMiddleware, adminMiddleware} = require('../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', newToken);
router.post('/adminRemove', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
