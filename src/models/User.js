const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['guest', 'admin', 'superAdmin'],
        default: 'guest'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
