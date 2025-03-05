const authService = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const {username, password, role} = req.body;
        const result = await authService.registerUser(username, password, role);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const result = await authService.loginUser(username, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await authService.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {registerUser, loginUser, deleteUser};
