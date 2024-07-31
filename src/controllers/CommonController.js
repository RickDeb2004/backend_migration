const express = require('express');
const CommonService = require('../services/CommonService');
const LanguageService = require('../services/LanguageService');
const AbstractController = require('./AbstractController');
const { ApiResponse } = require('../models/ApiResponse');
const { HttpStatus } = require('../utils/HttpStatus');

class CommonController extends AbstractController {
    constructor() {
        super();
        this.router = express.Router();
        this.router.get('/get-all-topics', this.getAllTopics.bind(this));
        this.router.get('/get-all-languages', this.getAllLanguages.bind(this));
    }

    async getAllTopics(req, res) {
        try {
            const topics = await CommonService.getAllTopics();
            res.status(HttpStatus.OK).json(ApiResponse.success(topics));
        } catch (error) {
            console.error("Error in getAllTopics:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ApiResponse.failure("Error in fetching all topics"));
        }
    }

    async getAllLanguages(req, res) {
        try {
            const languages = await LanguageService.getAllLanguages();
            res.status(HttpStatus.OK).json(ApiResponse.success(languages));
        } catch (error) {
            console.error("Error in getAllLanguages:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ApiResponse.failure("Error in fetching all languages"));
        }
    }
}

module.exports = new CommonController().router;
