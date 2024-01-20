const express = require('express');
const router = express.Router();
const { findUserById, findAllUsers} = require('../handlers/user')

router.get('/:id', findUserById );
router.get('/', findAllUsers );

module.exports = router