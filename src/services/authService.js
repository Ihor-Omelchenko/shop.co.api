const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerAdmin = async (adminName, password, role = 'guest') => {
    if (role !== 'guest') {
        throw new Error("You cannot assign roles manually");
    }

    const existingAdmin = await Admin.findOne({adminName});
    if (existingAdmin) throw new Error("Admin already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({adminName, password: hashedPassword, role});
    await newAdmin.save();

    return {userId: newAdmin._id, message: "Admin registered successfully", role: newAdmin.role};
};

const loginAdmin = async (adminName, password) => {
    const admin = await Admin.findOne({adminName});
    if (!admin) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = jwt.sign({id: admin._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({id: admin._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '24h'});

    return {accessToken, refreshToken};
};

const newToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("No refresh token provided");
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        throw new Error("Invalid refresh token");
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
        throw new Error("Admin not found");
    }

    const newAccessToken = jwt.sign({id: admin._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
    const newRefreshToken = jwt.sign({id: admin._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '24h'});

    return {newAccessToken, newRefreshToken};
}

module.exports = {registerAdmin, loginAdmin, newToken};

