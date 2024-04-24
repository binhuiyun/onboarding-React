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
  getAppByStatus,
  getProfileByOpt,
  addToDocument,
  getDocByUserId,
} = require("../handlers/personalInformation");
router.get("/opt", getProfileByOpt);
router.get('/status/:status', getAppByStatus);
router.get("/:id", getPersonalInformation);
router.get("/documents/:id", getDocByUserId);

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
router.post("/:id/:fileType", upload.single("file"), addToDocument);

module.exports = router;
