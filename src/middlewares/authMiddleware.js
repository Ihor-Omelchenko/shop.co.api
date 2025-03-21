const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({error: "Unauthorized"});

    try {
        req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        next();
    } catch (error) {
        res.status(401).json({error: "Invalid token"});
    }
};

const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({error: 'No token provided'});

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({error: 'Invalid or expired token'});

        Admin.findById(decoded.id)
            .then(user => {
                if (!user || (user.role !== 'admin' && user.role !== 'superAdmin')) {
                    return res.status(403).json({error: 'Access denied. Admins only'});
                }

                req.user = user;
                next();
            })
            .catch(() => {
                res.status(403).json({error: 'User not found or error occurred'});
            });
    });
};

const superAdminMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({error: 'No token provided'});

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({error: 'Invalid or expired token'});

        Admin.findById(decoded.id)
            .then(user => {
                if (!user || user.role !== 'superAdmin') {
                    return res.status(403).json({error: 'Access denied. SuperAdmins only'});
                }

                req.user = user;
                next();
            })
            .catch(() => {
                res.status(403).json({error: 'User not found or error occurred'});
            });
    });
};

module.exports = {authMiddleware, adminMiddleware, superAdminMiddleware};
