const express = require('express');
const router = express.Router();
const { getAppByStatus, getAppById, updateApplicationStatus } = require('../handlers/application');

router.get('/:status', getAppByStatus)
router.get('/apps/:id', getAppById)
router.put('/apps/:id', updateApplicationStatus)


module.exports = router;