const express = require('express');
const config = require('./config');
const securityConfig = require('./config/securityConfig');

const app = express();

// Apply security configuration middleware
app.use(securityConfig);

// Middleware to parse JSON
app.use(express.json());

// S3 Routes setup
const s3Routes = require('./routes/s3Routes');
app.use('/api/s3', s3Routes);

// Start the server
const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
