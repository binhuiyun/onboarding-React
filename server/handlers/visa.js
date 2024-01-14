const { visaModel } = require("../models/visaDocuments");

const getVisaById = async (req, res) => {
  try {
    const visaDoc = await visaModel.findById(req.params.id);
    res.status(200).json(visaDoc);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getVisaById,
};
