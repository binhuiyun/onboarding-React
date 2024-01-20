const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  updatePersonalInformation,
  getPersonalInformation,
  createPersonalInformation,
  addProfilePicture,
} = require("../handlers/personalInformation");

router.get("/:id", getPersonalInformation);
router.put("/:id", updatePersonalInformation);
router.post("/:id", createPersonalInformation);
router.post(
  "/upload/profilePicture/:id",
  upload.single("file"),
  addProfilePicture
);

module.exports = router;
