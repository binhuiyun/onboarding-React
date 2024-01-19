const PersonalInformation = require("../models/personalInformation");

const getAllEmployeeProfile = async (req, res) => {
  try {
    const employeeProfile = await PersonalInformation.find();
    res.status(200).json(employeeProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getEmployeeProfileByName = async (req, res) => {
  const { name } = req.params;
  try {
    const query = {
      $or: [
        { "name.firstName": { $regex: name, $options: "i" } },
        { "name.lastName": { $regex: name, $options: "i" } },
        { "name.middleName": { $regex: name, $options: "i" } },
        { "name.preferredName": { $regex: name, $options: "i" } },
      ],
    };
    const employeeProfile = await PersonalInformation.find(query);
    console.log("employeeProfile", employeeProfile);
    res.status(200).json(employeeProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// const getEmployeeProfileByName = async (req, res) => {
//     const { name } = req.params;
//     const names = name.split(" ");
//     console.log("names", names);
//     try {
//       const query = {
//         $or: names.map((n) => ({
//           "name.firstName": { n, $options: "i" },
//           "name.lastName": { n, $options: "i" },
//           "name.middleName": { n, $options: "i" },
//           "name.preferredName": { n, $options: "i" },
//         })),
//       };
//       const employeeProfile = await PersonalInformation.find(query);
//       console.log("employeeProfile", employeeProfile);
//       res.status(200).json(employeeProfile);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   };

const getEmployeeProfileByPID = async (req, res) => {
  const { p_id } = req.params;
  try {
    const employeeProfile = await PersonalInformation.findById(p_id);
    res.status(200).json(employeeProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllEmployeeProfile,
  getEmployeeProfileByName,
  getEmployeeProfileByPID
};
