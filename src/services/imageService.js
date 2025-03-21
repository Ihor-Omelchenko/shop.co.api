const mongoose = require('mongoose');
const {GridFSBucket} = require('mongodb');

const getImageStream = async (fileId) => {
    try {
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, {bucketName: 'uploads'});

        const file = await db.collection('uploads.files').findOne({_id: new mongoose.Types.ObjectId(fileId)});

        if (!file) {
            return {error: 'File not found', status: 404};
        }

        return {file, stream: bucket.openDownloadStream(file._id)};
    } catch (error) {
        return {error: 'Server error', status: 500};
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
