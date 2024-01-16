const express = require("express");
const router = express.Router();
const { createVisaModel, getVisaById } = require("../handlers/visa");

router.post("/", createVisaModel);
router.get("/:id", getVisaById);
module.exports = router;
