const userService = require('../services/adminService');
const authService = require('../services/authService');

const getAdmins = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const {role, search} = req.query;

        const result = await userService.getAdmins(page, limit, role, search);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const {id} = req.body;
        const result = await authService.deleteAdmin(id);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getAdminById = async (req, res) => {
    try {
        const {id} = req.body;
        const result = await userService.getAdminById(id);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {getAdmins, deleteAdmin, getAdminById};
