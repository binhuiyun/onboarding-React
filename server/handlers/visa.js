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
// POST /api/visa/approve/:id/:fileType
const approveFile = async (req, res) => {
  try {
    const visaDoc = await visaModel.findOne({ user: req.params.id });
    const { fileType } = req.params;
    console.log(fileType);
    visaDoc[fileType].status = "approved";
    await visaDoc.save();
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// POST /api/visa/feedback/:id/:fileType
const addHrFeedback = async (req, res) => {
  try {
    const visaDoc = await visaModel.findOne({ user: req.params.id });
    const { feedback } = req.body;
    const { fileType } = req.params;
    visaDoc[fileType].feedback = feedback;
    visaDoc[fileType].status = "rejected";
    await visaDoc.save();
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// GET /api/visa/hr
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
      let fileToDealName = "";
      if (model.optReceipt && model.optReceipt.status === "pending") {
        nextStep = "Waiting for HR to approve the OPT Receipt";
        action = "need review";
        fileToDeal = "optReceipt";
        fileToDealName = "OPT Receipt";
      } else if (model.optEAD && model.optEAD.status === "pending") {
        nextStep = "Waiting for HR to approve the OPT EAD";
        action = "need review";
        fileToDeal = "optEAD";
        fileToDealName = "OPT EAD";
      } else if (model.I983 && model.I983.status === "pending") {
        nextStep = "Waiting for HR to approve and sign the I983";
        action = "need review";
        fileToDeal = "I983";
        fileToDealName = "I-983";
      } else if (model.I20 && model.I20.status === "pending") {
        nextStep = "Waiting for HR to approve the I20";
        action = "need review";
        fileToDeal = "I20";
        fileToDealName = "I-20";
      } else if (
        model.optReceipt.status === "approved" &&
        !model.optEAD.fileDoc
      ) {
        nextStep = "Upload a copy of the OPT EAD";
        action = "send notification";
        fileToDeal = "optEAD";
        fileToDealName = "OPT EAD";
      } else if (model.optEAD.status === "approved" && !model.I983.fileDoc) {
        nextStep = "Download and fill out the I-983 form";
        action = "send notification";
        fileToDeal = "I983";
        fileToDealName = "I983";
      } else if (model.I983.status === "approved" && !model.I20.fileDoc) {
        nextStep =
          "Send the I-983 along all necessary documents to the school and upload the new I-20";
        action = "send notification";
        fileToDeal = "I20";
        fileToDealName = "I-20";
      } else if (model.I20.status === "approved") {
        nextStep = "All documents have been approved";
        docStatus = "DONE";
        action = "DONE";
      }

      if (profileData) {
        const { name, employment, workAuthorization } = profileData;
        const data = {
          id: id,
          firstName: name.firstName,
          lastName: name.lastName,
          name: `${name.firstName} ${name.lastName}`,
          preferredName: name.preferredName,
          middleName: name.middleName,
          Work_Authorization: {
            title: workAuthorization.workAuthorizationType,
            start_date: employment.startDate,
            end_date: employment.endDate,
            remaining: 0,
          },
          // employment.endDate.getTime() - employment.startDate.getTime(),
          Next_Step: nextStep, // The NEXT STEP of action
          docStatus: docStatus, // finish all or not; if finished: DONE; if not: IN PROGRESS
          action: action,
          fileToDeal: fileToDeal,
          fileToDealName: fileToDealName,
          Documentation: {
            optReceipt: model.optReceipt,
            optEAD: model.optEAD,
            I983: model.I983,
            I20: model.I20,
          },
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
  approveFile,
};
