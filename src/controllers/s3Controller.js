// src/controllers/s3Controller.js
const s3Service = require('../services/s3Service');

const uploadFile = async (req, res) => {
  const { bucketName, key } = req.body;
  const body = req.file.buffer; // Assuming you're using multer for file uploads

  try {
    const data = await s3Service.uploadFile(bucketName, key, body);
    res.json({ message: 'File uploaded successfully', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFile = async (req, res) => {
  const { bucketName, key } = req.params;

  try {
    const file = await s3Service.getFile(bucketName, key);
    res.send(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFile,
  getFile,
};
