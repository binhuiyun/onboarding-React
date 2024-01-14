const PersonalInformation = require("../models/personalInformation");

const createPersonalInformation = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      preferredName,
      profilePicture,
      currentAddress,
      cellPhoneNumber,
      workPhoneNumber,
      email,
      ssn,
      dateOfBirth,
      gender,
      citizenshipStatus,
      citizenshipType,
      workAuthorization,
      fileUpload,
      reference,
      emergencyContact,
      summaryOfUploadedFiles,
    } = req.body;
    console.log(req.body);
     const personalInformation = new PersonalInformation(req.body);
     await personalInformation.save();
    res.status(201).json(personalInformation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getPersonalInformation = async (req, res) => {
  try {
    const personalInformation = await PersonalInformation.find();
    res.status(200).json(personalInformation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updatePersonalInformation = async (req, res) => {
  const { id: _id } = req.params;
  const personalInformation = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No personalInformation with id: ${_id}`);

  const updatedPersonalInformation =
    await PersonalInformation.findByIdAndUpdate(
      _id,
      { ...personalInformation, _id },
      { new: true }
    );

  res.json(updatedPersonalInformation);
};

module.exports = {
  createPersonalInformation,
  getPersonalInformation,
  updatePersonalInformation,
};
