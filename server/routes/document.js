const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {getDocumentsByUserId, addToDocument} = require("../handlers/document");

router.get("/:id", getDocumentsByUserId);
router.post("/:id/:fileType", upload.single("file"), addToDocument);

module.exports = router;