const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../handlers/auth');

router.post('/verify', verifyToken);
router.post('/register', register);
router.post('/login', login);

module.exports = router;