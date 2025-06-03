const {getImageStream, uploadFileToGridFS} = require('../services/imageService');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

const getImage = async (req, res) => {
    try {
        const { file, buffer, error, status } = await getImageStream(req.params.id);

        if (error) {
            return res.status(status).json({ error });
        }

        res.set('Content-Type', file.contentType || 'application/octet-stream');
        res.set('Content-Disposition', `inline; filename="${file.filename}"`);
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const uploadToGridFS = async (req, res) => {
    try {
        const {fileId, error, status} = await uploadFileToGridFS(req.file);

        if (error) {
            return res.status(status).json({error});
        }

        res.status(status).json({fileId});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {upload, getImage, uploadToGridFS};
