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

// p_id
const getPersonalInformation = async (req, res) => {
  const u_id = req.params.id;
  try {
    const personalInformation = await PersonalInformation.findOne({
      user: u_id,
    });
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
