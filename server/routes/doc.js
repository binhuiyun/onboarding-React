const express = require("express");
const router = express.Router();
const { updateDocument} = require("../handlers/doc");

router.put("/:id", updateDocument)

module.exports = router;