const Application = require('../models/profile');

const getAppByStatus = async (req, res) => {
    try {
        const app = await Application.find({status: req.params.status});
        res.status(200).json(app);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
    };

module.exports = {
    getAppByStatus
};