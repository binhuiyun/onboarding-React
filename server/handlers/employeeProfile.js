const PersonalInformation = require("../models/personalInformation");

const getAllEmployeeProfile = async (req, res) => {
  try {
    const employeeProfile = await PersonalInformation.find();
    res.status(200).json(employeeProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getEmployeeProfileByUID = async (req, res) => {};

module.exports = {
  getAllEmployeeProfile,
  getEmployeeProfileByUID,
};
