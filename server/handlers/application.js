const Application = require('../models/personalInformation');


const getAppByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const app = await Application.find({onboardingStatus:status});
        res.status(200).json(app);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
    };
    
const getAppById = async (req, res) => {
    const { id } = req.params;
    try {
        const app = await Application.findById(id);
        res.status(200).json(app);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
    }
module.exports = {
    getAppByStatus, getAppById
};