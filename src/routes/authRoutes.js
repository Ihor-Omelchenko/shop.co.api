const {registerAdmin, loginAdmin, newToken} = require('../controllers/authController');
const {authMiddleware, superAdminMiddleware} = require('../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/register', authMiddleware, superAdminMiddleware, registerAdmin);
router.post('/login', loginAdmin);
router.post('/refresh', newToken);

module.exports = router;
