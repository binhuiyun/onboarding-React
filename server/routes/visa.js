const express = require("express");
const router = express.Router();
const { getVisaById } = require("../handlers/visa");

router.get("/:id", getVisaById);
module.exports = router;
