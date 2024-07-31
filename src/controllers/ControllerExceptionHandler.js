const express = require('express');
const bodyParser = require('body-parser');
const ControllerExceptionHandler = require('./controllers/ControllerExceptionHandler');
const commonRoutes = require('./controllers/CommonController');
const codeRoutes = require('./controllers/CodeController');

const app = express();
app.use(bodyParser.json());

app.use('/api/common', commonRoutes);
app.use('/api/code', codeRoutes);

// Error handling middleware
app.use(ControllerExceptionHandler.handleMethodArgumentNotValidException);
app.use(ControllerExceptionHandler.handleException);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
