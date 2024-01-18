const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../handlers/auth');


router.post('/register', verifyToken);
router.post('/login', login);

module.exports = router;