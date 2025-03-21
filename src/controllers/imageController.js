const {getImageStream, uploadFileToGridFS} = require('../services/imageService');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

const getImage = async (req, res) => {
    try {
        const {file, stream, error, status} = await getImageStream(req.params.id);

        if (error) {
            return res.status(status).json({error});
        }

        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `inline; filename="${file.filename}"`);

        stream.on('error', () => res.status(500).json({error: 'File transfer error'}));
        stream.pipe(res);
    } catch (error) {
        res.status(500).json({error: error.message});
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
