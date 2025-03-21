const userService = require('../services/adminService');

const getAdmins = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const { role, search } = req.query;

        const result = await userService.getAdmins(page, limit, role, search);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAdmins };
