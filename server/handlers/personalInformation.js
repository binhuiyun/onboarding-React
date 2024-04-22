const PersonalInformation = require("../models/personalInformation");

const createPersonalInformation = async (req, res) => {
  const u_id = req.params.id;
  console.log(u_id, req.body);
  try {
    const personalInformation = await PersonalInformation.findOne({
      userId: u_id,
    });
    if (!personalInformation) {
      const newPersonalInformation = new PersonalInformation(req.body);
      await newPersonalInformation.save();
      res.status(201).json(newPersonalInformation);
    } else {
      res.status(409).json({ message: "Personal Information already exists" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// u_id
const getPersonalInformation = async (req, res) => {
  const u_id = req.params.id;
  try {
    const personalInformation = await PersonalInformation.findOne({
      userId: u_id,
    });
    if (!personalInformation) {
      res.status(404).json({ message: "Personal Information not found" });
    } else res.status(200).json(personalInformation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// u_id
const updatePersonalInformation = async (req, res) => {
  const u_id = req.params.id;
  const personalInformation = req.body;
  console.log(u_id, personalInformation);

  const record = await PersonalInformation.findOne({ userId: u_id });
  if (!record) {
    res.status(404).json({ message: "Personal Information not found" });
  } else {
    await PersonalInformation.findOneAndUpdate(
      { userId: u_id },
      personalInformation
    );
    res.status(200).json(personalInformation);
  }
};

const getAllProfile = async (req, res) => {
  try {
    const personalInformation = await PersonalInformation.find().sort(
      {"lastName":1}
    
    );
    res.status(200).json(personalInformation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createProfilePictureBuffer = async (req, res) => {
  const u_id = req.params.id;
  console.log(u_id, req.file);
  // const URL = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
  //   "base64"
  // )}`;
  const buffer = req.file.buffer;
  console.log(buffer);
  res.status(200).json({ buffer });
};

const uploadProfilePicture = async (req, res) => {
  const u_id = req.params.id;
  console.log(u_id, req.file);
  const personalInformation = await PersonalInformation.findOne({ user: u_id });
  if (!personalInformation) {
    res.status(404).json({ message: "Personal Information not found" });
  } else {
    const buffer = req.file.buffer;
    console.log(buffer);
    const updatedPersonalInformation =
      await PersonalInformation.findOneAndUpdate(
        { user: u_id },
        { profilePicture: buffer }
      );
    res.status(200).json(updatedPersonalInformation);
  }
};

const deleteEmergencyContactByIndex = async (req, res) => {
  try {
    //const index = req.params.index;
    const firstName = req.params.firstName;
    const p_id = req.body._id;
    console.log(firstName, p_id);
    const personalInformation = await PersonalInformation.findById(p_id);
    if (!personalInformation) {
      return res
        .status(404)
        .json({ message: "Personal Information not found" });
    }
   const updatedEmergencyContact = personalInformation.emergencyContact.filter(
      (emergencyContact) => emergencyContact.firstName !== firstName
    );
    console.log(updatedEmergencyContact);
    const updatedPersonalInformation =
      await PersonalInformation.findOneAndUpdate(
        { _id: p_id },
        { emergencyContact: updatedEmergencyContact },
        { new: true } // Ensure you get the updated document in the response
      );
    console.log("updatedPersonalInformation", updatedPersonalInformation);
    res.status(200).json(updatedPersonalInformation);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEmploymentbyVisaTitle = async (req, res) => {
  try {
    const visaTitle = req.params.visaTitle;
    const p_id = req.body._id;
    const personalInformation = await PersonalInformation.findById(p_id);
    if (!personalInformation) {
      return res
        .status(404)
        .json({ message: "Personal Information not found" });
    }
    const updatedEmployment = personalInformation.employment.filter(
      (employment) => employment.visaTitle !== visaTitle
    );
    console.log(updatedEmployment);
    const updatedPersonalInformation =
      await PersonalInformation.findOneAndUpdate(
        { _id: p_id },
        { employment: updatedEmployment },
        { new: true } // Ensure you get the updated document in the response
      );
    console.log("updatedPersonalInformation", updatedPersonalInformation);
    res.status(200).json(updatedPersonalInformation);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAppByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const app = await PersonalInformation.find({ onboardingStatus: status });
    res.status(200).json(app);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createPersonalInformation,
  getPersonalInformation,
  getAllProfile,
  updatePersonalInformation,
  uploadProfilePicture,
  createProfilePictureBuffer,
  deleteEmploymentbyVisaTitle,
  deleteEmergencyContactByIndex,
  getAppByStatus,
};
