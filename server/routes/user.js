const express = require('express');
const router = express.Router();
const { findUserById, findAllUsers, updateCurrentUser} = require('../handlers/user')

router.get('/:id', findUserById );
router.get('/', findAllUsers );
router.put('/:id', updateCurrentUser);

module.exports = router