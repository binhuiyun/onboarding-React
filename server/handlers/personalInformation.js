const PersonalInformation = require("../models/personalInformation");

const createPersonalInformation = async (req, res) => {
  const u_id = req.params.id;
  console.log(u_id, req.body);
  try {
    const personalInformation = await PersonalInformation.findOne({
      user: u_id,
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
      user: u_id,
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

  const record = await PersonalInformation.findOne({ user: u_id });
  if (!record) {
    res.status(404).json({ message: "Personal Information not found" });
  } else {
    await PersonalInformation.findOneAndUpdate(
      { user: u_id },
      personalInformation
    );
    res.status(200).json(personalInformation);
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

module.exports = {
  createPersonalInformation,
  getPersonalInformation,
  updatePersonalInformation,
  uploadProfilePicture,
  createProfilePictureBuffer,
};
