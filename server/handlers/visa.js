const Visa = require("../models/visaDocuments");

const getVisaById = async (req, res) => {
  try {
    const visaDoc = await Visa.findById(req.params.id);
    res.json(visaDoc);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getVisaById,
};
