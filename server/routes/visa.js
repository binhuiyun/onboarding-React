const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  createVisaModel,
  getVisaById,
  addToVisaDocumentation,
  downloadEmptyAndSample,
  getAllVisa,
  getHrSideData,
  addHrFeedback,
  approveFile,
  sendNotification,
} = require("../handlers/visa");

router.get("/", getAllVisa);
router.get("/hr", getHrSideData);
router.get("/sample", downloadEmptyAndSample);
router.get("/:id", getVisaById);
router.post("/", createVisaModel);
router.post("/:id/:fileType", upload.single("file"), addToVisaDocumentation);
router.post("/feedback/:id/:fileType", addHrFeedback);
router.post("/approve/:id/:fileType", approveFile);
router.post("/send-mail", sendNotification);
module.exports = router;
