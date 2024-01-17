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

module.exports = {
    getAppByStatus
};