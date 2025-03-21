const authService = require('../services/authService');

const registerAdmin = async (req, res) => {
    try {
        const {adminName, password, role} = req.body;
        const result = await authService.registerAdmin(adminName, password, role);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const loginAdmin = async (req, res) => {
    try {
        const {adminName, password} = req.body;
        const result = await authService.loginAdmin(adminName, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const newToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;
        const result = await authService.newToken(refreshToken);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {registerAdmin, loginAdmin, newToken};
