const express = require("express");
const router = express.Router();
const {
  updatePersonalInformation,
  getPersonalInformation,
  createPersonalInformation,
} = require("../handlers/personalInformation");

router.get("/", getPersonalInformation);
router.put("/:id", updatePersonalInformation);
router.post("/", createPersonalInformation);

module.exports = router;
