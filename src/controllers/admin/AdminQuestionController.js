// src/controllers/admin/adminQuestionController.js
const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const questionService = require('../../services/questionService');
const { success, failure } = require('../../utils/responseHandlers');
const router = express.Router();
const multer = require('multer');
const upload = multer();

// Get all questions
router.get('/get-all-questions', async (req, res) => {
  try {
    console.log("get-all-questions");
    const questionDetails = await questionService.getAllQuestions();
    return res.status(200).json(success(questionDetails));
  } catch (error) {
    console.error(error);
    return res.status(500).json(failure(error.message));
  }
});

// Get question details by ID
router.get('/:questionId', [
  param('questionId').isInt().withMessage('Question ID must be an integer')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(failure(errors.array()));
  }

  const questionId = req.params.questionId;

  try {
    console.log(`admin-get-question-details: ${questionId}`);
    const questionDetails = await questionService.getQuestionDetailsById(questionId);
    if (questionDetails) {
      return res.status(200).json(success(questionDetails));
    } else {
      return res.status(404).json(failure("Question does not exist."));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(failure(error.message));
  }
});

// Delete question by ID
router.delete('/delete-by-id', [
  query('questionId').isInt().withMessage('Question ID must be an integer')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(failure(errors.array()));
  }

  const questionId = req.query.questionId;

  try {
    await questionService.deleteQuestionById(questionId);
    return res.status(200).json(success("Question deleted successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(failure(error.message));
  }
});

// Save a new question
router.post('/save', [
  body('questionText').isString().withMessage('Question text must be a string'),
  // Add more validations as per your QuestionRequestRecord.NewQuestion class
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(failure(errors.array()));
  }

  const questionRequestRecord = req.body;

  try {
    const savedQuestion = await questionService.saveQuestion(questionRequestRecord);
    return res.status(201).json(success(savedQuestion));
  } catch (error) {
    console.error(error);
    return res.status(500).json(failure(error.message));
  }
});

// Update an existing question
router.put('/update', [
  body('questionText').isString().withMessage('Question text must be a string'),
  // Add more validations as per your QuestionRequestRecord.UpdateQuestion class
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(failure(errors.array()));
  }

  const questionRequestRecord = req.body;

  try {
    const updatedQuestion = await questionService.saveQuestion(questionRequestRecord);
    return res.status(200).json(success(updatedQuestion));
  } catch (error) {
    console.error(error);
    return res.status(500).json(failure(error.message));
  }
});

// Upload files
router.post('/files-upload', upload.array('files'), async (req, res) => {
  const questionId = req.body.questionId;

  if (!questionId) {
    return res.status(400).json(failure('Question ID is required'));
  }

  try {
    const files = req.files;
    const uploadedFileURLs = await questionService.uploadInputFilesToS3(questionId, files);

    console.log(`files-to-upload: ${files.length}, actual-uploaded: ${uploadedFileURLs.length}`);

    if (uploadedFileURLs.length < files.length) {
      return res.status(500).json(failure('Failed to upload files. Please retry.'));
    } else {
      return res.status(200).json(success(uploadedFileURLs));
    }
  } catch (error) {
    console.error('Error while file-upload:', error);
    return res.status(500).json(failure(error.message));
  }
});

module.exports = router;
