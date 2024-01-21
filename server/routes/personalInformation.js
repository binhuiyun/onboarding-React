const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  updatePersonalInformation,
  getPersonalInformation,
  createPersonalInformation,
  uploadProfilePicture,
  createProfilePictureBuffer,
  deleteEmploymentbyVisaTitle,
} = require("../handlers/personalInformation");

router.get("/:id", getPersonalInformation);
router.put("/:id", updatePersonalInformation);
router.post("/:id", createPersonalInformation);
router.post(
  "/upload/profilePicture/:id",
  upload.single("file"),
  uploadProfilePicture
);
router.post(
  "/create/profilePicture/:id",
  upload.single("file"),
  createProfilePictureBuffer
);
router.put("/delete/employment/:visaTitle", deleteEmploymentbyVisaTitle);

module.exports = router;
