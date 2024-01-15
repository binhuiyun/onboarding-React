const express = require('express');
const router = express.Router();
const { getAppByStatus } = require('../handlers/application');

router.get('/:status', getAppByStatus)

module.exports = router;