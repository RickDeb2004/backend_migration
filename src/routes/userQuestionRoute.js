// src/routes/userQuestionRoutes.js
const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/:id', (req, res) => {
  // Handle GET request for question by ID
  res.send(`Question ID: ${req.params.id}`);
});

module.exports = router;
