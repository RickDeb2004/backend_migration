const express = require('express');
const CodeController = require('../controllers/CodeController');

const router = express.Router();

router.post('/execute', CodeController.executeCode);

module.exports = router;
