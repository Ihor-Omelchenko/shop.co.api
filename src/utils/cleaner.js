const cron = require('node-cron');
const mongoose = require('mongoose');

const startCleaner = () => {
    cron.schedule('0 * * * *', async () => {
        const db = mongoose.connection.db;

        const cutoffTime = new Date(Date.now() - 60 * 60 * 1000);

        const expiredFiles = await db.collection('uploads.files').find({
            'metadata.temporary': true,
            'metadata.createdAt': {$lt: cutoffTime}
        }).toArray();

        for (const file of expiredFiles) {
            await db.collection('uploads.files').deleteOne({_id: file._id});
            await db.collection('uploads.chunks').deleteMany({files_id: file._id});
        }
    });
};

module.exports = startCleaner;
