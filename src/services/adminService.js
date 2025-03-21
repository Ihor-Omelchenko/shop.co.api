const Admin = require('../models/Admin');

const getAdmins = async (page = 1, limit = 10, role, search) => {
    const query = {};

    if (role) {
        query.role = role;
    }

    if (search) {
        query.adminName = {$regex: search, $options: 'i'};
    }

    const totalAdmins = await Admin.countDocuments(query);

    const admins = await Admin.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({adminName: 1});

    return {
        totalAdmins,
        totalPages: Math.ceil(totalAdmins / limit),
        currentPage: page,
        admins,
    };
};

module.exports = {getAdmins};
