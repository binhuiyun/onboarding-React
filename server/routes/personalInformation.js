const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  updatePersonalInformation,
  getPersonalInformation,
  getAllProfile,
  createPersonalInformation,
  uploadProfilePicture,
  createProfilePictureBuffer,
  deleteEmploymentbyVisaTitle,
  deleteEmergencyContactByIndex,
  getAppByStatus,
} = require("../handlers/personalInformation");

router.get('/status/:status', getAppByStatus)
router.get("/:id", getPersonalInformation);

router.get("/", getAllProfile);
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
router.put("/delete/emergencyContact/:firstName", deleteEmergencyContactByIndex);

module.exports = router;
