const express = require("express");
const router = express.Router();
const {getAllDocument, updateDocument} = require("../handlers/doc");

router.get("/", getAllDocument)
router.put("/:id", updateDocument)

module.exports = router;