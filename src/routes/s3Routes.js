// src/routes/s3Routes.js
const express = require('express');
const multer = require('multer');
const s3Controller = require('../controllers/s3Controller');

const router = express.Router();
const upload = multer(); // Using multer for file upload handling

router.post('/upload', upload.single('file'), s3Controller.uploadFile);
router.get('/file/:bucketName/:key', s3Controller.getFile);

module.exports = router;
