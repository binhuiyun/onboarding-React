const express = require("express");
const router = express.Router();
const { updateDocument, deleteDocument} = require("../handlers/doc");

router.put("/:id", updateDocument)
router.delete("/:id", deleteDocument)

module.exports = router;