const userService = require('../services/userService');

const getUsers = async (req, res) => {
    try {
        const { page, limit, role, search } = req.query;
        const result = await userService.getUsers(page, limit, role, search);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUsers };
