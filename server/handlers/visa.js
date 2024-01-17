const { visaModel } = require("../models/visaDocuments");
const getAllVisa = async (req, res) => {
  try {
    const visaDoc = await visaModel.find();
    res.status(200).json(visaDoc);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
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
    const fileType = req.params.fileType;
    const visaDoc = await visaModel.findOne({ employee: req.params.id });
    visaDoc[fileType] = {
      fileName: req.file.originalname,
      fileDoc: req.file.buffer,
      status: "pending",
    };
    await visaDoc.save();
    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const downloadEmptyAndSample = async (req, res) => {
  try {
    const filePath = "../server/public/Template.zip";
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading files:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createVisaModel,
  getVisaById,
  addToVisaDocumentation,
  downloadEmptyAndSample,
  getAllVisa,
};
