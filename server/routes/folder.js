const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { addToFolder, getFolder, updateFolder } = require('../handlers/folder');

router.post('/:id',upload.single("file"), addToFolder);
router.get('/:id', getFolder);
router.put('/:id', updateFolder);

module.exports = router;