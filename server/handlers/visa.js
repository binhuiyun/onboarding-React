const { visaModel, optDocModel } = require("../models/visaDocuments");
const createVisaModel = async (req, res) => {
  try {
    const { employee } = req.body;
    const visaDocument = await visaModel.create({ employee: employee });
    res.status(201).json(visaDocument);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getVisaById = async (req, res) => {
  try {
    const visaDoc = await visaModel.findOne({ employee: req.params.id });
    if (visaDoc) res.status(200).json(visaDoc);
    else res.status(204).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const addToVisaDocumentation = async (req, res) => {
  try {
    const visaDoc = await visaModel.findOne({ employee: req.params.id });
    const fileType = req.params.fileType;
    const optDoc = await optDocModel.create({
      fileName: req.file.mimetype,
      fileDoc: req.file.buffer,
      fileType: fileType,
      status: "pending",
    });
    console.log(optDoc);
    visaDoc[fileType] = optDoc._id;
    visaDoc.save();
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  createVisaModel,
  getVisaById,
  addToVisaDocumentation,
};
