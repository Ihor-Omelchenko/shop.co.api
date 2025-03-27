const {getAdminById, getAdmins, deleteAdmin} = require('../controllers/adminController');
const {authMiddleware, superAdminMiddleware} = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

router.post('/remove', authMiddleware, superAdminMiddleware, deleteAdmin);
router.post('/getAdminById', authMiddleware, getAdminById)
router.get('/', authMiddleware, getAdmins);

module.exports = router;
