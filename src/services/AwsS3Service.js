// src/services/s3Service.js
const s3 = require('../config/s3Config');

const uploadFile = async (bucketName, key, body) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
  };

  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const getFile = async (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
};

module.exports = {
  uploadFile,
  getFile,
};
