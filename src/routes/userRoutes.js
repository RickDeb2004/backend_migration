const express = require('express');
const UserController = require('../controllers/UserController');
const UserQuestionController = require('../controllers/user/UserQuestionController');

const router = express.Router();

router.post('/user-info', UserController.getUserInfo);
router.get('/question/find-by-code-language', UserQuestionController.getByCodeLanguage);
router.get('/question/get-all-questions', UserQuestionController.getAllQuestions);
router.get('/question/get-question/:questionId', UserQuestionController.getQuestionDetails);
router.get('/question/get-solution', UserQuestionController.getSolutionForQuestion);

module.exports = router;
