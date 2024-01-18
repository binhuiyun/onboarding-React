const express = require('express');
const router = express.Router();
const { findUserById } = require('../handlers/user')
router.get('/:uid', findUserById );

module.exports = router;