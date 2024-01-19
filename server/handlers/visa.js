const { visaModel } = require("../models/visaDocuments");
const PersonalInformation = require("../models/personalInformation");
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
    const { user } = req.body;
    const visaDocument = await visaModel.create({ user: user });
    res.status(201).json(visaDocument);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getVisaById = async (req, res) => {
  try {
    const visaDoc = await visaModel.findOne({ user: req.params.id });
    if (visaDoc) res.status(200).json(visaDoc);
    else res.status(204).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const addToVisaDocumentation = async (req, res) => {
  try {
    const fileType = req.params.fileType;
    let visaDoc = await visaModel.findOne({ user: req.params.id });
    if (!visaDoc) {
      visaDoc = await visaModel.create({ user: req.params.id });
    }
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
// temp api for hr side table
// POST /api/visa/feedback/:id/:fileType

const addHrFeedback = async (req, res) => {
  try {
    const visaDoc = await visaModel.findOne({ user: req.params.id });
    visaDoc[fileType].feedback = req.params.feedback;
    await visaDoc.save();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// GET
const getHrSideData = async (req, res) => {
  try {
    const arr = [];
    for (const model of await visaModel.find({})) {
      const id = model.user;
      const profileData = await PersonalInformation.findOne({ user: id });
      let nextStep = "";
      let action = "";
      let docStatus = "IN PROGRESS";
      let fileToDeal = "";
      if (model.optReceipt && model.optReceipt.status === "pending") {
        nextStep = "Waiting for HR to approve the OPT Receipt";
        action = "need review";
        fileToDeal = "optReceipt";
      } else if (model.optEAD && model.optEAD.status === "pending") {
        nextStep = "Waiting for HR to approve the OPT EAD";
        action = "need review";
        fileToDeal = "optEAD";
      } else if (model.I983 && model.I983.status === "pending") {
        nextStep = "Waiting for HR to approve and sign the I983";
        action = "need review";
        fileToDeal = "I983";
      } else if (model.I20 && model.I20.status === "pending") {
        nextStep = "Waiting for HR to approve the I20";
        action = "need review";
        fileToDeal = "I20";
      } else if (model.optReceipt === "approved" && !model.optEAD) {
        nextStep = "Please upload a copy of your OPT EAD";
        action = "send notification";
        fileToDeal = "optEAD";
      } else if (model.optEAD === "approved" && !model.I983) {
        nextStep = "Please download and fill out the I-983 form";
        action = "send notification";
        fileToDeal = "I983";
      } else if (model.I983 === "approved" && !model.I20) {
        nextStep =
          "Please send the I-983 along all necessary documents to your school and upload the new I-20";
        action = "send notification";
        fileToDeal = "I20";
      } else if (model.I20 === "approved") {
        nextStep = "All documents have been approved";
        docStatus = "DONE";
      }

      if (profileData) {
        const { name, employment } = profileData;
        const data = {
          firstName: name.firstName,
          lastName: name.lastName,
          preferredName: name.preferredName,
          Work_Authorization_title: employment.visaTitle,
          Work_Authorization_start_data: employment.startDate,
          Work_Authorization_end_data: employment.endDate,
          Work_Authorization_remaining:
            employment.endDate.getTime() - employment.startDate.getTime(),
          optReceipt: model.optReceipt,
          optEAD: model.optEAD,
          I983: model.I983,
          I20: model.I20,
          nextStep: nextStep, // The NEXT STEP of action
          docStatus: docStatus, // finish all or not; if finished: DONE; if not: IN PROGRESS
          action: action,
          fileToDeal: fileToDeal,
        };

        arr.push(data);
      }
    }

    res.status(200).json(arr);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createVisaModel,
  getVisaById,
  addToVisaDocumentation,
  downloadEmptyAndSample,
  getAllVisa,
  getHrSideData,
  addHrFeedback,
};
