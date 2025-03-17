const User = require('../models/User');

const getUsers = async (page = 1, limit = 10, role, search) => {
    const query = {};

    if (role) {
        query.role = role;
    }

    if (search) {
        query.username = {$regex: search, $options: 'i'};
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({username: 1});

    return {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        users,
    };
};

module.exports = {getUsers};
