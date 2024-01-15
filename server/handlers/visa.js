const { visaModel } = require("../models/visaDocuments");

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
module.exports = {
  createVisaModel,
  getVisaById,
};
