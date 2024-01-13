const express = require('express');
const router = express.Router();
const { getTokenHistory, addTokenHistory } = require('../handlers/tokenHistory');

router.get('/', getTokenHistory);
router.post('/', addTokenHistory);

module.exports = router;