const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (username, password, role = 'guest') => {
    if (role !== 'guest') {
        throw new Error("You cannot assign roles manually");
    }

    const existingUser = await User.findOne({username});
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, password: hashedPassword, role});
    await newUser.save();

    return {userId: newUser._id, message: "User registered successfully", role: newUser.role};
};

const loginUser = async (username, password) => {
    const user = await User.findOne({username});
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = jwt.sign({id: user._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'});
    const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});

    return {accessToken, refreshToken};
};

const deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    await User.findByIdAndDelete(userId);
    return {message: "User deleted successfully"};
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

    const user = await User.findById(decoded.id);
    if (!user) {
        throw new Error("User not found");
    }

    const accessToken = jwt.sign({id: user._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'});

    return {accessToken};
}

module.exports = {registerUser, loginUser, deleteUser, newToken};

