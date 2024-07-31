const express = require('express');
const AdminQuestionController = require('../controllers/admin/AdminQuestionController');

const router = express.Router();

router.get('/question/get-all-questions', AdminQuestionController.getAllQuestions);
router.get('/question/:questionId', AdminQuestionController.getQuestionDetails);
router.delete('/question/delete-by-id', AdminQuestionController.deleteQuestion);
router.post('/question/save', AdminQuestionController.saveQuestion);
router.put('/question/update', AdminQuestionController.updateQuestion);
router.post('/question/files-upload', AdminQuestionController.filesUpload);

module.exports = router;
