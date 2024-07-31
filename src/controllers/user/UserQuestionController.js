const express = require('express');
const UserQuestionService = require('../../services/user/UserQuestionService');
const AbstractController = require('../AbstractController');
const { ApiResponse } = require('../../models/ApiResponse');
const { HttpStatus } = require('../../utils/HttpStatus');

class UserQuestionController extends AbstractController {
    constructor() {
        super();
        this.router = express.Router();
        this.router.get('/find-by-code-language', this.getByCodeLanguage.bind(this));
        this.router.get('/get-all-questions', this.getAllQuestions.bind(this));
        this.router.get('/get-question/:questionId', this.getQuestionDetails.bind(this));
        this.router.get('/get-solution', this.getSolutionForQuestion.bind(this));
    }

    async getByCodeLanguage(req, res) {
        const { language } = req.query;
        console.log(`find-by-language: ${language}`);

        try {
            const questions = await UserQuestionService.getByCodeLanguage(language);
            res.status(HttpStatus.OK).json(ApiResponse.success(questions));
        } catch (error) {
            console.error("Error in getByCodeLanguage:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ApiResponse.failure("Error in fetching questions by code language"));
        }
    }

    async getAllQuestions(req, res) {
        console.log("get-all-questions");

        try {
            const questionRecordList = await UserQuestionService.getAllActiveQuestions();
            res.status(HttpStatus.OK).json(ApiResponse.success(questionRecordList));
        } catch (error) {
            console.error("Error in getAllQuestions:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ApiResponse.failure("Error in fetching all questions"));
        }
    }

    async getQuestionDetails(req, res) {
        const jwt = req.user; // Assuming `req.user` contains the authentication information
        const { questionId } = req.params;
        console.log(`get-question-details authentication: ${JSON.stringify(jwt)}, id: ${questionId}`);

        try {
            const questionDTO = await UserQuestionService.getQuestionDetails(jwt, questionId);
            if (questionDTO) {
                res.status(HttpStatus.OK).json(ApiResponse.success(questionDTO));
            } else {
                res.status(HttpStatus.BAD_REQUEST).json(ApiResponse.failure("Question not found."));
            }
        } catch (error) {
            console.error("Error in getQuestionDetails:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ApiResponse.failure("Error in fetching question details"));
        }
    }

    async getSolutionForQuestion(req, res) {
        const jwt = req.user; // Assuming `req.user` contains the authentication information
        const { questionId } = req.query;
        console.log(`get-question user: ${JSON.stringify(jwt)}, question-id: ${questionId}`);

        try {
            const solutionsDTOList = await UserQuestionService.getSolution(questionId);
            res.status(HttpStatus.OK).json(ApiResponse.success(solutionsDTOList));
        } catch (error) {
            console.error("Error in getSolutionForQuestion:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ApiResponse.failure("Error in fetching solutions for question"));
        }
    }
}

module.exports = new UserQuestionController().router;
