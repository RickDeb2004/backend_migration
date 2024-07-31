const express = require('express');
const codeRoutes = require('./codeRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.use('/code', codeRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
