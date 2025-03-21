const {authMiddleware, superAdminMiddleware} = require('../middlewares/authMiddleware');
const express = require('express');
const {getAdmins} = require('../controllers/adminController');
const {deleteAdmin} = require("../controllers/authController");

const router = express.Router();

router.get('/', authMiddleware, getAdmins);
router.post('/remove', authMiddleware, superAdminMiddleware, deleteAdmin);

module.exports = router;
