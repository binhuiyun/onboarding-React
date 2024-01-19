const express = require('express');
const router = express.Router();
const { getAppByStatus, getAppById } = require('../handlers/application');

router.get('/:status', getAppByStatus)
router.get('/:id', getAppById)

module.exports = router;