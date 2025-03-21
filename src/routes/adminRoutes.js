const {authMiddleware, superAdminMiddleware} = require('../middlewares/authMiddleware');
const {deleteAdmin} = require('../controllers/adminController');
const {getAdmins} = require('../controllers/adminController');

const express = require('express');
const router = express.Router();

router.get('/', authMiddleware, getAdmins);
router.post('/remove', authMiddleware, superAdminMiddleware, deleteAdmin);

module.exports = router;
