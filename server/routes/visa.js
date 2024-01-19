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
} = require("../handlers/visa");

router.post("/", createVisaModel);
router.get("/", getAllVisa);
router.get("/sample", downloadEmptyAndSample);
router.get("/:id", getVisaById);
router.post("/:id/:fileType", upload.single("file"), addToVisaDocumentation);
router.get("/hr", getHrSideData);
router.post("/feedback/:id/:fileType", addHrFeedback);
module.exports = router;
