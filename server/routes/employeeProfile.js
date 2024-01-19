const express = require("express");
const router = express.Router();
const { getAllEmployeeProfile, getEmployeeProfileByName, getEmployeeProfileByPID } = require("../handlers/employeeProfile");

router.get("/", getAllEmployeeProfile);
router.get("/:name", getEmployeeProfileByName);
router.get("/profile/:p_id", getEmployeeProfileByPID);

module.exports = router;
