const {getImage, uploadToGridFS, upload} = require('../controllers/imageController');

const express = require('express');
const router = express.Router();

router.post('/upload', upload.single('image'), uploadToGridFS);
router.get('/:id', getImage);

module.exports = router;
