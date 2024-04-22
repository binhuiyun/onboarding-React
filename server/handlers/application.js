const Application = require("../models/personalInformation");

const getAppByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const app = await Application.find({ onboardingStatus: status });
    res.status(200).json(app);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAppById = async (req, res) => {
  const { id } = req.params;
  try {
    const app = await Application.find({userId: id});
    res.status(200).json(app);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const app = await Application.find({userId: id});
    console.log("before update", app.onboardingStatus);
    app.onboardingStatus = req.body.onboardingStatus ?? app.onboardingStatus;
    app.HRfeedback = req.body.feedback ?? app.HRfeedback;
    await app.save();
    console.log("after update", app.onboardingStatus);
    res.status(200).json(app);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getAppByStatus,
  getAppById,
  updateApplicationStatus,
};
