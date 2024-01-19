const express = require("express");
const router = express.Router();
const { getAllEmployeeProfile, getEmployeeProfileByUID } = require("../handlers/employeeProfile");

router.get("/", getAllEmployeeProfile);
router.get("/:id", getEmployeeProfileByUID);

module.exports = router;
