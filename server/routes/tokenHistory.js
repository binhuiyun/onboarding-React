const express = require('express');
const router = express.Router();
const { getTokenHistory, generateAndSend, updateTokenStatus } = require('../handlers/tokenHistory');

router.get('/', getTokenHistory);
router.post('/', generateAndSend);
router.put('/:email', updateTokenStatus);


module.exports = router;