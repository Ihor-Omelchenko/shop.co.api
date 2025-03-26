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
        .select('-password')
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

const getAdminById = async (adminId) => {
    const admin = await Admin.findById(adminId);
    if (!admin) {
        throw new Error("Admin not found");
    }

    const adminObj = admin.toObject();
    delete adminObj.password;

    return adminObj;
}

module.exports = {getAdmins, getAdminById};
