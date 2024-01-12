const express = require("express");
const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
