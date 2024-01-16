const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  createVisaModel,
  getVisaById,
  addToVisaDocumentation,
} = require("../handlers/visa");

router.post("/", createVisaModel);
router.get("/:id", getVisaById);
router.post("/:id/:fileType", upload.single("file"), addToVisaDocumentation);
module.exports = router;
