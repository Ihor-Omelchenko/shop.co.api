const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({error: "Unauthorized"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({error: "Invalid token"});
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superAdmin')) {
        return res.status(403).json({error: "Access denied. Admins only"});
    }
    next();
};

const superAdminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'superAdmin') {
        return res.status(403).json({error: "Access denied. Super Admins only"});
    }
    next();
};

module.exports = {authMiddleware, adminMiddleware, superAdminMiddleware};
