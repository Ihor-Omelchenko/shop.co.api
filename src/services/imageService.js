const mongoose = require('mongoose');
const {GridFSBucket} = require('mongodb');

const getImageStream = async (fileIdStr) => {
    try {
        const fileId = new mongoose.Types.ObjectId(fileIdStr);
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        const file = await db.collection('uploads.files').findOne({ _id: fileId });

        if (!file) {
            return { error: 'File not found', status: 404 };
        }

        const chunks = [];

        return new Promise((resolve, reject) => {
            const stream = bucket.openDownloadStream(fileId);

            stream.on('data', chunk => chunks.push(chunk));
            stream.on('error', err => reject({ error: 'Stream error', status: 500 }));
            stream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve({ file, buffer, status: 200 });
            });
        });
    } catch (error) {
        console.error('getImageStream error:', error.message);
        return { error: 'Server error', status: 500 };
    }
};

const uploadFileToGridFS = async (file) => {
    try {
        if (!file) {
            return {error: 'File not uploaded', status: 400};
        }

        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, {bucketName: 'uploads'});

        const existingFile = await db.collection('uploads.files').findOne({
            filename: file.originalname,
            'metadata.temporary': true
        });

        if (existingFile) {
            await bucket.delete(existingFile._id);
        }

        const uploadStream = bucket.openUploadStream(file.originalname, {
            metadata: {temporary: true, createdAt: new Date()},
        });

        return new Promise((resolve, reject) => {
            uploadStream.end(file.buffer);

            uploadStream.on('finish', () => {
                resolve({fileId: uploadStream.id.toString(), status: 200});
            });

            uploadStream.on('error', (err) => {
                reject({error: 'File could not be saved', status: 500});
            });
        });

    } catch (error) {
        return {error: 'Server error', status: 500};
    }
};

module.exports = {getImageStream, uploadFileToGridFS};
