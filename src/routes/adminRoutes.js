const {authMiddleware, superAdminMiddleware} = require('../middlewares/authMiddleware');
const {getAdminById} = require('../controllers/adminController');
const {deleteAdmin} = require('../controllers/adminController');
const {getAdmins} = require('../controllers/adminController');

const express = require('express');
const router = express.Router();

router.post('/remove', authMiddleware, superAdminMiddleware, deleteAdmin);
router.post('/getAdminById', authMiddleware, getAdminById)
router.get('/', authMiddleware, getAdmins);

module.exports = router;
