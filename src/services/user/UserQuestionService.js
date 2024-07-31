const { Question } = require('../../models/Question');
const { UserAccountService } = require('../../services/UserAccountService');
const { QuestionRecordMapper } = require('../../mappers/QuestionRecordMapper');
const { Authentication } = require('../../utils/Authentication');
const { SubscriptionDetails } = require('../../models/SubscriptionDetails');

exports.getByCodeLanguage = async (language) => {
    try {
        const questions = await Question.find({ language });
        return questions;
    } catch (error) {
        throw new Error('Error retrieving questions by language.');
    }
};

exports.getAllActiveQuestions = async () => {
    try {
        const questions = await Question.find({ active: true });
        return questions.map(QuestionRecordMapper.toQuestionDTO);
    } catch (error) {
        throw new Error('Error retrieving all active questions.');
    }
};

exports.getQuestionDetails = async (authentication, questionId) => {
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return null;
        }

        const questionDTO = QuestionRecordMapper.toQuestionDTO(question);
        const questionTier = question.tier;

        if (questionTier >= 2 && authentication) {
            const userAccount = await UserAccountService.getByUserSub(authentication.sub);
            if (userAccount) {
                if (questionTier === 3) {
                    const subscription = userAccount.subscriptionDetails;
                    if (subscription && subscription.endDate > new Date()) {
                        questionDTO.questionDetails = QuestionRecordMapper.toQuestionDetailsDTO(question);
                        questionDTO.templates = QuestionRecordMapper.toQuestionLanguageTemplateList(question.templates);
                    }
                } else {
                    questionDTO.questionDetails = QuestionRecordMapper.toQuestionDetailsDTO(question);
                    questionDTO.templates = QuestionRecordMapper.toQuestionLanguageTemplateList(question.templates);
                }
            }
        } else {
            questionDTO.questionDetails = QuestionRecordMapper.toQuestionDetailsDTO(question);
            questionDTO.templates = QuestionRecordMapper.toQuestionLanguageTemplateList(question.templates);
        }

        return questionDTO;
    } catch (error) {
        throw new Error('Error retrieving question details.');
    }
};

exports.getSolution = async (questionId) => {
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            throw new Error('Invalid question ID.');
        }

        const solutions = QuestionRecordMapper.toSolutionDTOList(question.solutions);
        const solutionTier = question.solutionTier;

        if (solutionTier >= 2) {
            const authentication = Authentication.getAuthentication();
            if (authentication) {
                const userAccount = await UserAccountService.getByUserSub(authentication.sub);
                if (userAccount) {
                    if (solutionTier === 3) {
                        const subscriptionDetails = userAccount.subscriptionDetails;
                        if (!subscriptionDetails || subscriptionDetails.endDate <= new Date()) {
                            return [];
                        }
                    }
                } else {
                    return [];
                }
            } else {
                return [];
            }
        }

        return solutions;
    } catch (error) {
        throw new Error('Error retrieving solutions.');
    }
};
