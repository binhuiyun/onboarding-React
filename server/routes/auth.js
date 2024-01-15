const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../handlers/auth');
const auth = require('../middleware/auth');

router.get('/register', auth, verifyToken);
router.post('/register', register);
router.post('/login', login);

module.exports = router;