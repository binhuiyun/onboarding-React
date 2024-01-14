const express = require('express');
const router = express.Router();
const { getTokenHistory, addTokenHistory, generateAndSend } = require('../handlers/tokenHistory');

router.get('/', getTokenHistory);
router.post('/', generateAndSend);


module.exports = router;